# 简介
此模板旨在帮助您使用 Vue 3和 TypeScript 进行开发。该模板使用 Vue 3 `<script setup>` SFCs，查看 [脚本设置文档](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) 了解更多信息。
# 开始
* 单击 **运行** 按钮启动程序。
![图片](https://lf-cdn.marscode.com.cn/obj/eden-cn/ljhwz_lkpkbvsj/ljhwZthlaukjlkulzlp/project_template/prod/c979b03a6d881789b7134dcc0098b962f58059f9/images/native_nodejs_vue/image-0.jpg)

* 转到 Webview 查看实时页面。
![图片](https://lf-cdn.marscode.com.cn/obj/eden-cn/ljhwz_lkpkbvsj/ljhwZthlaukjlkulzlp/project_template/prod/c979b03a6d881789b7134dcc0098b962f58059f9/images/native_nodejs_vue/image-1.jpg)

默认情况下，MarsCode运行 start 脚本，你可以通过更改 **. vscode/launch.json** 中的配置来配置它。参考 [Visual Studio Code的文档](https://code.visualstudio.com/docs/editor/debugging) 有关如何配置 launch. json。
# 了解更多
要了解有关Vue的更多信息，请查看以下资源：
- [VUE](https://vuejs.org/) -了解Vue功能。
- [Vite](https://vitejs.dev/) -了解VITE功能。
# 帮助
如果你需要帮助，你可以查看[文档](https://docs.marscode.cn/)，或向我们提供[反馈](https://juejin.cn/pin/club/7359094304150650889?utm_source=doc&utm_medium=marscode)。
# git hooks约定
规范填写commit信息，具体规范可查看[.commitlintrc]
代码提交的时候会自动校验commit信息，不符合规范会报错。
会对提交到暂存区的代码进行格式化，保证代码格式统一和可读性。
# 路由约定
## 默认静态路由
src/views-default 文件夹下的是默认静态路由，包括导航错误页面(404.vue), 登录页面(Login.vue)，首页(Home.vue)
## 自动注册的动态路由
文件夹命名规则：请使用横杠连接，例如：user-manage
vue单文件组件命名规则也请使用横杠连接，例如：user-manage.vue，这样在同一文件夹下文件数量多的时候，文件夹可读性更强。
如果想要使用动态参数，请使用中括号连接，例如：user-manage[id].vue，这样在访问时，url为：/user-manage/1，路由参数为：{ id: 1 }
src/views 文件夹下的是自动注册的动态路由，该文件夹下的文件会自动注册为路由，文件名即为路由的name，文件内容即为路由的组件。
# 类型声明文件夹types约定
types文件夹下放置项目的类型声明文件，默认使用.d.ts后缀。
请将带有import语句的类型声明到单独的文件夹下，单独进行引入。
不与外部类型进行交互的类型直接使用【type】关键字进行声明，这样在项目全局不需要声明即可使用。
推荐使用【type】关键字是因为在vscode环境下，使用type声明的关键字鼠标放上去可以直接看到具体的类型，而interface声明的类型只能看到一个名字。
