'use strict';

const ReactNative = require('react-native');
const {
    Dimensions,
    PixelRatio,
    Navigator,
} = ReactNative;

const SCREEN_WIDTH_BASE = 375;
const { width, height } = Dimensions.get('window');
const pxielRatio = PixelRatio.get();
const { TotalNavHeight, NavBarHeight, StatusBarHeight } = Navigator.NavigationBar.Styles.General;
const statusBarHeight = 0;
const workHeight = height - statusBarHeight;

module.exports = {
    tw: width, // 屏幕的真实宽度
    w: SCREEN_WIDTH_BASE, // 屏幕的宽度
    th: workHeight, // 屏幕的真实高度（android不包含状态栏）
    h: workHeight * SCREEN_WIDTH_BASE / width, // 屏幕的高度（android不包含状态栏）
    tfh: height, // 屏幕全屏的真实高度（android包含状态栏）
    fh: height * SCREEN_WIDTH_BASE / width, // 屏幕全屏的高度（android包含状态栏）
    tch: workHeight - TotalNavHeight, // 界面的真实高度
    ch: (workHeight - TotalNavHeight) * SCREEN_WIDTH_BASE / width, // 界面的高度
    trueStatusBarHeight: StatusBarHeight, // android状态栏真实高度
    statusBarHeight: StatusBarHeight * SCREEN_WIDTH_BASE / width, // android状态栏高度
    trueTotalNavHeight: NavBarHeight, // 导航栏的真实高度
    navbarHeight: NavBarHeight * SCREEN_WIDTH_BASE / width, // 导航栏的高度
    trueTotalNavbarHeight: TotalNavHeight, // 导航栏的真实总高度
    totalNavbarHeight: TotalNavHeight * SCREEN_WIDTH_BASE / width, // 导航栏的总高度
    pr: pxielRatio,
    s: (w) => { return w * width / SCREEN_WIDTH_BASE; },
    rs: (w) => { return w * SCREEN_WIDTH_BASE / width; },
};
