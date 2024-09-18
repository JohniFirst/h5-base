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
- 规范填写commit信息，具体规范可查看[.commitlintrc]
- 代码提交的时候会自动校验commit信息，不符合规范会报错。
- 会对提交到暂存区的代码进行格式化，保证代码格式统一和可读性。
# 分支约定
- main: 主分支，线上分支。【永远不要】直接在main分支上进行你的工作
- dev: 主测试分支，这个分支的代码是放置到测试服务器的代码，【永远不要】直接在测试分支上进行开发
## 开发分支
进行功能开发的时候，从dev分支新建出一个业务分支，在上边进行你的开发工作
## 合并到测试分支
- 1、将dev分支的代码合并到你当前的开发分支，【解决冲突】请在你自己的开发分支上进行
- 2、【永远不要】在dev分支上解决冲突
- 3、测试工作完成之后，及时删除你的开发分支，甚至，你可以不用将开发分支同步到远程仓库
# 合并到主分支
从dev分支合并到main分支

完整的合并分支操作应该是这样：
   -  git branch 查看当前分支，确保从dev分支新建开发分支
   - git checkout -b 你的开发分支 从dev分支新建出一个开发分支
   -  ...进行你的开发工作
   -  git switch dev 切换到dev分支
   -  git pull 同步最新的dev分支代码
   -  git switch 你的开发分支
   -  git merge dev 将dev分支的代码合并到你的开发分支
   -  git switch dev 切换回dev分支
   -  git merge 你的开发分支 合并你的开发分支到dev分支
   -  git push 将测试分支的代码推送到远程仓库
   -  ...测试完成之后
   -  git switch main 切换到main分支
   -  git merge dev 合并dev分支到main分支
   -  git push 将main分支的代码推送到远程仓库
   -  打包部署到线上

# 路由约定
## 默认静态路由
src/views-default 文件夹下的是默认静态路由，包括导航错误页面(404.vue), 登录页面(Login.vue)，首页(Home.vue)
## 自动注册的动态路由
- 文件夹命名规则：请使用横杠连接，例如：user-manage
- vue单文件组件命名规则也请使用横杠连接，例如：user-manage.vue，这样在同一文件夹下文件数量多的时候，文件夹可读性更强。
- 如果想要使用动态参数，请使用中括号连接，例如：user-manage[id].vue，这样在访问时，url为：/user-manage/1，路由参数为：{ id: 1 }
- src/views 文件夹下的是自动注册的动态路由，该文件夹下的文件会自动注册为路由，文件名即为路由的name，文件内容即为路由的组件。
# 类型声明文件夹types约定
- types文件夹下放置项目的类型声明文件，默认使用.d.ts后缀。
- 请将带有import语句的类型声明到单独的文件夹下，单独进行引入。
- 不与外部类型进行交互的类型直接使用【type】关键字进行声明，这样在项目全局不需要声明即可使用。
- 推荐使用【type】关键字是因为在vscode环境下，使用type声明的关键字鼠标放上去可以直接看到具体的类型，而interface声明的类型只能看到一个名字。
# 目录文件约定
- public 静态资源目录,这个目录下的文件会直接复制到dist目录下，不会进行任何处理。
  - public-js 业务开发中可能会用到一些外部的js jdk等文件，建议将这种js文件直接放置到这个目录下。
- src 源码目录
  - assets 静态资源目录
    - imgs 图片目录，如果是大型项目，建议在这个文件夹下再设置子文件夹，将不同模块的图片放置到子文件夹下
    - css 全局样式目录，这个文件夹下放置全局的css文件
      - app.css 全局样式文件，引入到main.ts中
      - reset.css 重置样式文件，为了加快解析进度，直接引入到了index.html文件中
    - svgs svg图标目录，如果是大型项目，建议在这个文件夹下再设置子文件夹，将不同模块的图片放置到子文件夹下
  - components 全局通用组件目录
  - router 路由目录
  - store 状态管理目录
  - utils 工具目录
  - views 视图目录
  - views-default 默认静态路由目录
  - main.ts 全局入口文件
  - vite-env.d.ts vite环境变量类型声明文件、同时引入了vant的类型声明文件，开发过程中可以获得完整的类型提示
- types 类型声明目录，全局声明的类型，文件中如果不包含import语句，全局可以直接使用
# css约定
<p>大胆使用最新的css语法来构建你的样式，不要再使用less、scss等预处理器。</p>
<p>项目启用了lightningcss，可以使css打包更快，体积更小</p>
