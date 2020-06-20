// how react (render process) will communicate with electron main process

const { remote } = window.require('electron'); // hack to get electron without ejecting react

// usefull constants
const win = remote.getCurrentWindow();
const view = win.getBrowserView();

export function toggleTheaterView(theater) {
  const bounds = win.getContentBounds();
  view.setBounds({
    x: 0,
    y: 47,
    width: bounds.width - (theater ? 340 : 0),
    height: bounds.height - 47
  });
}

export function getGlobal(store, key) {
  return remote.getGlobal(store)[key];
}

export function setGlobal(store, state) {
  for (let key in state) {
    remote.getGlobal(store)[key] = state[key];
  }
}

// TODO: make sure memory isn't being leaked in this file...
// https://www.electronjs.org/docs/api/remote#passing-callbacks-to-the-main-process
export function initNavigationListener(callback) {
  view.webContents.on('did-start-navigation', (event, url, isInPlace) => {
    callback(url, isInPlace);
  });
}

export function canGoBack() {
  return view.webContents.canGoBack();
}

export function canGoForward() {
  return view.webContents.canGoForward();
}

export function goBack() {
  view.webContents.goBack();
}

export function goForward() {
  view.webContents.goForward();
}

