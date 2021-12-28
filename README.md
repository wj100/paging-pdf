# paging-pdf

> 前端pdf分页下载
> 默认竖屏

## 使用方法

###  1. 安装

```bash
yarn add paging-pdf
```
###  1. 使用
```js
import pagingPdf from 'paging-pdf';
pagingPdf(fileName,selector)
```

### 3.Attributes

|     参数     |  类型   |                    描述                     |
| :----------: | :-----: | :-----------------------------------------: |
|     fileName     | string |     下载文件名     |
|     selector     | string |     分页容器className,以此分页 **例：.pdf-content**     |
|     direction     | string |    'l'为横屏，默认'p'(竖屏)     |
