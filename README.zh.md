# 純牌效率計算機 (Beta)
https://mj-efficiency-cal.netlify.app/

Read this in [English](./README.md).
## 功能
- 支援多種和牌規則（面子手、香港、日本、中庸、國標、台灣、港式台灣）
- 考慮改良數、及進張後，平均下一向聽進張數
- 不考慮翻數、防守、牌河、或鳴牌
- 分享鏈結
 
## 牌效率Node Package
主要的計算程序已搬遷到[node package](https://www.npmjs.com/package/mahjong-tile-efficiency)。原始碼則可以到此[repo](https://github.com/garyleung142857/mahjong-tile-efficiency)查閱。

## 數據

計數機提供以下數據：

- **向聽數**：還差多少張牌才可以聽牌
- **入章數 / 聽牌數**：有多少張未見的牌能令向聽數減一
- **改良平均**：考慮摸牌後可能的改良，剩餘非入章牌的加權平均。顯示於入章數後的括號內（如有）
- **下一向聽平均入章**：入章後，下一向聽的加權平均入章數
- **參考速度**：速度參考指數，只會在手牌一向聽或二向聽時顯示：
  - 一向聽時，參考速度是手牌在未來十次摸牌內，和牌的機會率約算
  - 二向聽時，參考速度是手牌在未來三次摸牌內，聽牌的機會率約算
- **入章列表**：列出入章種類。左上角的數字代表摸到這張入章後，下一向聽的入章數
- **改良列表**：列出改良種類。左上角的數字代表摸到這張改良後後的入章數。留意：「改良」是單純考慮入章數，而非速度

## 計算結果的排序

當用家輸入了 3n + 2 張牌時，手牌會處於棄牌階段。計算機會顯示每張棄牌的結果，並按下列方法排序：

- 向聽數，由小至大，接着
- 速度(優先)或入章數，由大至小

## 顏色

- 左邊外框反映當前進章數的優劣：紅色為優良、藍色為一般、綠色為差
- 底色反映平均下一向聽進章數的優劣：粉紅色為優良、淺藍色為一般、綠色為差
- 如果聽牌，底色會設為黃色

## 和牌規則牌型
- 面子手：只考慮面子雀頭基本形
- 舊章：面子 + 十三么
- 日本：面子 + 國士無雙（十三么）+ 七對子（不能重複）
- 中庸：面子 + 十三么九（十三么）+ 七對子（可重複）
- 國標：面子 + 十三么 + 七對（可重複）+ 組合龍 + 全不靠
- 台灣：面子
- 港式台灣：面子 + 十六不搭 + 嚦咕嚦咕 + 十三么

## 鳴謝

- 麻雀牌字體來自[萌娘百科](https://zh.moegirl.org.cn/Template:Mjs)