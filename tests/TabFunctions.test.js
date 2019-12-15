// テスト対象クラスの読み込み
var TabFunctions = require('../src/my_modules/TabFunctions.js')
var tabFunctions = new TabFunctions()

describe('TabFunctions', () => {
    describe('getLinkText()', () => {
        let tab = {
            title: 'example',
            url: 'http://example.com'
        }
        it('デフォルト', () => {
            expect(tabFunctions.getLinkText(tab, null)).toBe('[example](http://example.com)')
        })
        it('テンプレ指定', () => {
            expect(tabFunctions.getLinkText(tab, `<a href="${tab.url}">${tab.title}</a>`))
                .toBe('<a href="http://example.com">example</a>')
        })
    })
})