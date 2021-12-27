# fenye-pdf

> 前端pdf分页下载
> 暂时只支持横屏

## 使用方法

###  1. 安装

```bash
yarn add fenye-pdf
```
###  1. 使用
```js
import fenyePdf from 'fenye-pdf';
fenyePdf(fileName,selector)
```

### 3.Attributes

|     参数     |  类型   |                    描述                     |
| :----------: | :-----: | :-----------------------------------------: |
|     fileName     | string |     下载文件名     |
|     selector     | string |     分页容器className,以此分页 **例：.pdf-content**     |
