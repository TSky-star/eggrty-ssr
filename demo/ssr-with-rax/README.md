# Egg + React + SSR应用骨架

# ssr-with-rax

本example纯为rax开发端外h5页面服务，如果想用本example开发端内应用打包配置需要做适当调整
1、移除构建配置的optimization，只能全部打包成一个文件
2、移除polyfill

## 遗留问题

1、hmr方面由于使用了useRouter导致hmr时会报`useRouter can only be called once`的error,有兴趣的同学可以帮忙解决