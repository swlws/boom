const namespace = "bitsnav";

let cache: Record<string, any> = {};

function loadStore() {
  try {
    const store = localStorage.getItem(namespace) || "{}";
    cache = JSON.parse(store);
  } catch (e) {
    cache = {};
  }
}

function updateStore() {
  localStorage.setItem(namespace, JSON.stringify(cache));
}

// 注册浏览器Tab点击事件
let visibilityChangeEventExist = false;

export default function storageMgr() {
  loadStore();

  if (!visibilityChangeEventExist) {
    visibilityChangeEventExist = true;

    document.addEventListener("visibilitychange", function () {
      document.visibilityState === "visible" && loadStore();
    });
  }

  const getValue = (key: string) => {
    return cache[key];
  };

  const setValue = (key: string, value: any) => {
    cache[key] = value;

    updateStore();
  };

  return {
    getValue,
    setValue,
  };
}
