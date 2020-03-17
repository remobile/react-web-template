'use strict';

console.disableYellowBox = true;

const React = require('react');const ReactNative = require('react-native');
const {
    StyleSheet,
    Navigator,
    Platform,
    BackAndroid,
    View,
    Text,
    Image,
    StatusBar,
    ToastAndroid,
} = ReactNative;

global._ = require('lodash');
global.sr = require('./config/Screen');
const COLOR = require('./config/Color');
global._c = COLOR._c;
global._bc = COLOR._bc;
global._tc = COLOR._tc;
global.Toast = text => ToastAndroid.show(text, 3000);
global.CONSTANTS = require('./config/Constants');
global.NT = require('./config/Notify');
const Utils = require('./utils');
global.POST = Utils.POST;
global.GET = Utils.GET;
global.UPLOAD = Utils.UPLOAD;
const TimerMixin = require('react-timer-mixin');

const Route = require('./config/Route');
const img = require('./resource/image');
const ProgressHud = require('./components/ProgressHud');
const DelayTouchableOpacity = require('./components/DelayTouchableOpacity');
const Modal = require('./components/Modal');
const MessageBox = require('./components/MessageBox');

global.app = {
    route: Route,
    utils: Utils,
    img: img,
    data: {},
    isandroid: Platform.OS === 'android',
};

global.SceneMixin = {
    componentWillMount () {
        app.scene = this;
    },
    onWillFocus () {
        app.scene = this;
    },
};

app.configureScene = function (route) {
    route = route || {};
    let sceneConfig = route.sceneConfig;
    if (sceneConfig) {
        return sceneConfig;
    }
    if (Platform.OS === 'android') {
        if (route.fromLeft) {
            sceneConfig = { ...Navigator.SceneConfigs.FloatFromLeft, gestures: null };
        } else {
            sceneConfig = Navigator.SceneConfigs.FadeAndroid;
        }
    } else {
        if (route.fromLeft) {
            sceneConfig = { ...Navigator.SceneConfigs.FloatFromLeft, gestures: null };
        } else {
            sceneConfig = { ...Navigator.SceneConfigs.HorizontalSwipeJump, gestures: null };
        }
    }
    return sceneConfig;
};

const Home = require('./home');

const NavigationBarRouteMapper = {
    LeftButton (route, navigator, index, navState) {
        let leftButton = route.leftButton || route.component.leftButton;
        if (index === 0 && !leftButton) {
            return null;
        }
        if (typeof leftButton === 'function') {
            leftButton = leftButton();
        }
        const image = leftButton && leftButton.image || app.img.common_white_back;
        const title = leftButton && leftButton.title || '';
        const handler = leftButton && leftButton.handler || navigator.pop;
        if (image && !title) {
            return (
                <DelayTouchableOpacity
                    onPress={handler}
                    style={styles.navBarButton}>
                    <Image
                        resizeMode='stretch'
                        source={image}
                        style={styles.navBarIcon} />
                </DelayTouchableOpacity>
            );
        } else {
            return (
                <DelayTouchableOpacity
                    onPress={handler}
                    style={styles.navBarButton}>
                    <Text style={styles.navBarButtonText}>
                        {leftButton.title}
                    </Text>
                </DelayTouchableOpacity>
            );
        }
    },
    RightButton (route, navigator, index, navState) {
        let rightButton = route.rightButton || route.component.rightButton;
        if (typeof rightButton === 'function') {
            rightButton = rightButton();
        }
        if (!rightButton) {
            return null;
        }
        if (rightButton.image) {
            return (
                <DelayTouchableOpacity
                    onPress={rightButton.handler}
                    style={styles.navBarButton}>
                    <Image
                        resizeMode='stretch'
                        source={rightButton.image}
                        style={rightButton.style || styles.navBarIcon} />
                </DelayTouchableOpacity>
            );
        } else {
            return (
                <DelayTouchableOpacity
                    onPress={rightButton.handler}
                    style={styles.navBarButton}>
                    <Text style={styles.navBarButtonText}>
                        {rightButton.title}
                    </Text>
                </DelayTouchableOpacity>
            );
        }
    },
    Title (route, navigator, index, navState) {
        const title = route.title || route.component.title;
        if (typeof title === 'function') {
            return (
                <View style={styles.titleContainer}>
                    <Text
                        numberOfLines={1}
                        style={styles.navBarTitleText}>
                        {title()}
                    </Text>
                </View>
            );
        } else if (typeof title === 'string') {
            return (
                <View style={styles.titleContainer}>
                    <Text
                        numberOfLines={1}
                        style={styles.navBarTitleText}>
                        {title}
                    </Text>
                </View>
            );
        } else {
            return (
                <View style={styles.titleContainer}>
                    {title}
                </View>
            );
        }
    },
};

module.exports = React.createClass({
    mixins: [TimerMixin],
    getInitialState () {
        return {
            showNavBar: false,
            modalShow: false,
            modalContent: null,
            modalBackgroundColor: null,
            modalTouchHide: false,
        };
    },
    componentWillMount () {
        app.root = this;
        app.showLoading = () => {
            this.refs.progressHud.show();
        };
        app.hideLoading = () => {
            this.refs.progressHud.hide();
        };
        StatusBar.setBackgroundColor('transparent');
        StatusBar.setTranslucent(true);
        app.showModal = (view, options = {}) => {
            const { backgroundColor, touchHide } = options;
            this.setState({
                modalShow: true,
                modalContent: view,
                modalBackgroundColor: backgroundColor,
                modalTouchHide: touchHide,
            });
        };
        app.closeModal = (callback) => {
            if (this.refs.modal) {
                this.refs.modal.closeModal(callback);
            } else {
                callback && callback();
            }
        };
        app.removeModal = (callback) => {
            this.setState({
                modalShow: false,
            }, callback);
        };
        app.showMessage = (content, options = {}) => {
            let onOk;
            if (typeof options === 'function') {
                onOk = options;
                options = {};
            } else {
                onOk = options.onOk;
            }
            const { width = 250, title = false, pop = 0, disableBackPress = true } = options;
            if (!onOk) {
                onOk = pop === 0 ? undefined : pop === -1 ? app.navigator.popToTop : app.navigator.popN.bind(null, pop);
            }
            if (disableBackPress) {
                app.disableBackPress = true;
            }
            app.showModal(
                <MessageBox content={content} width={width} title={title} onConfirm={() => { app.disableBackPress = false; onOk && onOk(); }} />
            );
        };
        app.update = () => {
            this.setState({});
        };
        app.forceUpdateNavbar = () => {
            this.setState({
                showNavBar: true,
            });
        };
        app.toggleNavigationBar = (show) => {
            this.setImmediate(() => {
                this.setState({ showNavBar:show });
            });
        };
        app.getCurrentRoute = (index = 0) => {
            const { routeStack, presentedIndex } = app.navigator.state;
            return routeStack[presentedIndex - index];
        };
        app.push = (route) => {
            app.navigator.push(route);
        };
        app.pop = (step = 1) => {
            if (step === 1) {
                app.navigator.pop();
            } else {
                const routes = app.navigator.getCurrentRoutes();
                const index = routes.length - step - 1;
                if (index > 0) {
                    app.navigator.popToRoute(routes[index]);
                } else {
                    app.navigator.popToTop();
                }
            }
        };
        // 替换第几的个页面，编号从0开始，如果为-x，则为替换倒数第x+1个页面，默认替换当前页面
        app.replace = (route, index) => {
            if (index === undefined) {
                app.navigator.replace(route);
            } else {
                const routes = app.navigator.getCurrentRoutes();
                const count = routes.length;
                if (index >= 0) {
                    if (index >= count) {
                        app.navigator.push(route);
                    } else {
                        app.navigator.replaceAtIndex(route, index, () => {
                            app.navigator.popN(count - index - 1);
                        });
                    }
                } else {
                    index = count + index - 1;
                    app.navigator.replaceAtIndex(route, index, () => {
                        app.navigator.popN(count - index - 1);
                    });
                }
            }
        };
        if (app.isandroid) {
            BackAndroid.addEventListener('hardwareBackPress', () => {
                if (app.disableBackPress) {
                    return true;
                }
                if (this.refs.progressHud && this.refs.progressHud.visible) {
                    app.hideLoading();
                    return true;
                }
                if (this.state.modalShow) {
                    this.setState({ modalShow: false });
                    return true;
                }
                const routes = app.navigator.getCurrentRoutes();
                if (routes.length > 1) {
                    const leftButton = routes[routes.length - 1].component.leftButton;
                    if (leftButton && leftButton.handler) {
                        leftButton.handler();
                    } else {
                        app.pop();
                    }
                    return true;
                }
                if (!this.willExitAndroid) {
                    Toast('再按一次返回键退出程序');
                    this.willExitAndroid = true;
                    this.setTimeout(() => { this.willExitAndroid = false; }, 3000);
                    return true;
                }
                return false;
            });
        }
    },
    configureScene (route) {
        return app.configureScene(route);
    },
    renderScene (route, navigator) {
        return (
            <View style={{ flex: 1 }}>
                {this.state.showNavBar && <View style={[styles.navBarBack, { backgroundColor: '#c81622' }]} />}
                <route.component
                    {...route.passProps}
                    ref={(ref) => { if (ref)route.ref = ref; }} />
            </View>
        );
    },
    render () {
        const initialRoute = {
            component: Home,
        };
        const navigationBar = (
            <Navigator.NavigationBar
                routeMapper={NavigationBarRouteMapper}
                style={[styles.navBar, { backgroundColor: '#c81622' }]}
                />
        );
        return (
            <View style={{ flex:1 }}>
                <Navigator
                    ref={(navigator) => {
                        if (navigator) {
                            app.navigator = navigator;
                        }
                    }}
                    debugOverlay={false}
                    style={styles.container}
                    initialRoute={initialRoute}
                    configureScene={this.configureScene}
                    renderScene={this.renderScene}
                    onDidFocus={(route) => {
                        if (route) {
                            const ref = route.ref;
                            const getChildScene = ref && ref.getChildScene;
                            // 注意：app.scene调用的时候一定需要使用封装函数，如：{handler: ()=>{app.scene.toggleEdit()}}，不能直接使用 handler: app.scene.toggleEdit.
                            // 在动画加载完成前 app.scene 还没有被赋值， 需要使用 SceneMixin 来设置 app.scene
                            const scene = app.scene = getChildScene ? getChildScene() : ref;
                            if (getChildScene && !scene.hasMouted) {
                                scene.hasMouted = true;
                                return;
                            }
                            scene && scene.onDidFocus && scene.onDidFocus();
                            // 如果时主页面，需要检测主页面和其子页面的回调
                            ref && ref !== scene && ref.onDidFocus && ref.onDidFocus();
                        }
                    }}
                    onWillFocus={(route) => {
                        if (route) {
                            const preRoute = app.navigator && app.getCurrentRoute();
                            if (preRoute) {
                                const preRef = preRoute.ref;
                                const preGetChildScene = preRef && preRef.getChildScene;
                                const preScene = preGetChildScene ? preGetChildScene() : preRef;
                                preScene && preScene.onWillHide && preScene.onWillHide();
                                // 如果时主页面，需要检测主页面和其子页面的回调
                                preRef && preRef !== preScene && preRef.onWillHide && preRef.onWillHide();
                            }
                            const ref = route.ref;
                            const getChildScene = ref && ref.getChildScene;
                            const scene = getChildScene ? getChildScene() : ref;
                            // 如果时主页面，需要检测主页面和其子页面的回调
                            scene && scene.onWillFocus && scene.onWillFocus();// 注意：在首次加载的时候页面没有被加载，route.ref为空，不会调用该函数，需要在该页面的componentWillMount里面处理首次逻辑，只有从上页面返回的时候才能被调用
                            ref && ref !== scene && ref.onWillFocus && ref.onWillFocus();
                        }
                    }}
                    navigationBar={this.state.showNavBar ? navigationBar : null}
                    />
                {
                    this.state.modalShow &&
                    <Modal ref='modal' backgroundColor={this.state.modalBackgroundColor} modalTouchHide={this.state.modalTouchHide}>
                        {this.state.modalContent}
                    </Modal>
                }
                <ProgressHud
                    ref='progressHud'
                    overlayColor='rgba(0, 0, 0, 0.6)'
                    color={'#c81622'}
                    />
            </View>
        );
    },
});

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#EEEEEE',
    },
    navBarBack: {
        height:sr.totalNavbarHeight,
    },
    navBar: {
        alignItems:'center',
        height: sr.totalNavbarHeight,
    },
    titleContainer: {
        width: sr.w,
        height: sr.navbarHeight,
        alignItems:'center',
        justifyContent: 'center',
        paddingTop: sr.translucent ? sr.statusBarHeight : 0,
    },
    navBarButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
    },
    navBarTitleText: {
        fontSize: 15,
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: '400',
        width: sr.w / 2,
    },
    navBarButton: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        height:sr.navbarHeight,
        alignItems: 'center',
        paddingTop: sr.translucent ? sr.statusBarHeight / 2 : 0,
    },
    navBarIcon: {
        width: sr.navbarHeight * (sr.translucent ? 0.3 : 0.35),
        height: sr.navbarHeight * (sr.translucent ? 0.3 : 0.35),
    },
});
