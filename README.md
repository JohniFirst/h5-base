## vue3 + vant4

基于vue 3和vant 4 的h5项目，提前做好了移动端适配。没有采用ts是因为ts在很多时候只会增加额外的开发负担
开启了lint-stage对代码提交信息进行规范，提交命令可查看配置文件

## 命令详解
初始化项目： git clone <github url>
启动项目：pnpm run dev
开启ipv4地址访问：pnpm start
打生产包：pnpm run build
生产包开启gzip压缩：pnpm run build-gzip
分析生产包中依赖的大小：pnpm run build-analyze
预览生产包：pnpm run preview

## 路由约定
views文件夹下，非components文件夹内的vue文件会被自动注册成路由
地址是相对于views文件夹的位置
name值是vue文件名
