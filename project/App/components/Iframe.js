const React = require('react');
const ReactNative = require('react-native');
const {
    View,
    ActivityIndicator,
 } = ReactNative;
import { iframeResizer } from 'iframe-resizer';

class Iframe extends React.Component {
    state = {
        isShowSpin: true,
    };
    componentDidMount () {
        this.fetchContent();
    }
    componentWillReceiveProps (nextProps) {
        const { src } = nextProps;
        if (src !== this.props.src) {
            this.fetchContent();
        }
    }
    fetchContent () {
        this.setState({ isShowSpin:true });
        fetch(this.props.src, { method: 'get' })
        .then((response) => response.text())
        .then((text) => {
            this.setState({ isShowSpin:false });
            this.updateIframe(text);
        });
    }
    updateIframe (content) {
        const frame = this.refs.frame;
        if (!frame) return;
        const doc = frame.contentDocument;
        if (!doc) return;
        doc.open();
        doc.write(content);
        doc.close();
        iframeResizer(this.props.iframeResizerOptions, frame);
    }
    injectIframeResizerUrl () {
        const frame = this.refs.frame;
        if (!frame) return;
        const doc = frame.contentDocument;
        if (!doc) return;
        let height = Math.max(this.calcPageHeight(doc), 850);
        frame.style.height = height + 'px';
        let injectTarget = null;
        ['head', 'HEAD', 'body', 'BODY', 'div', 'DIV'].forEach(tagName => {
            if (injectTarget) return;
            const found = doc.getElementsByTagName(tagName);
            if (!(found && found.length)) return;
            injectTarget = found[0];
        });
        if (!injectTarget) {
            console.error('Unable to inject iframe resizer script');
            return;
        }
        const resizerScriptElement = document.createElement('script');
        resizerScriptElement.type = 'text/javascript';
        resizerScriptElement.src = this.props.iframeResizerUrl;
        injectTarget.appendChild(resizerScriptElement);
    }
    onLoad () {
        this.injectIframeResizerUrl();
    }
    calcPageHeight (doc) {
        let cHeight = Math.max(doc.body.clientHeight, doc.documentElement.clientHeight);
        let sHeight = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight);
        let height = Math.max(cHeight, sHeight);
        return height;
    }
    render () {
        const { id, frameBorder, className, style } = this.props;
        const { isShowSpin } = this.state;
        return (
            <div>
                {
                    isShowSpin &&
                    <View style={{ flex: 1, width: sr.tw, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator />
                    </View>
                }
                <iframe
                    ref='frame'
                    id={id}
                    frameBorder={frameBorder}
                    className={className}
                    style={style}
                    onLoad={this.onLoad.bind(this)}
                    />
            </div>
        );
    }
}
Iframe.defaultProps = {
    iframeResizerEnable: true,
    iframeResizerOptions: {
        checkOrigin: false,
    },
    iframeResizerUrl: 'assets/js/iframeResizer.contentWindow.min.js',
    frameBorder: 0,
    style: {
        width: '100%',
        minHeight: sr.h,
    },
};

module.exports = Iframe;
