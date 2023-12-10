import fs from 'fs'
import cherio from 'cherio'
import chalk from 'chalk'
import { getPageContent } from './helpers/puppeteer'
import { convertToCSV } from './helpers/convertToCSV'

const URL_INITIAL = 'https://www.dns-shop.ru/catalog/17a8d26216404e77/vstraivaemye-xolodilniki?p=1'

type TfridgeData = {
  title: string
  price: string
}

const main = async () => {
  try {
    const fridgeData: TfridgeData[] = []
    const pagesCount = 5
    for (let page = 1; page <= pagesCount; page++) {
      // const URL = URL_INITIAL + page
      const URL = URL_INITIAL
      const content = await getPageContent(URL)
      const $ = cherio.load(content)

      $('.catalog-product').each((i, header) => {
        const title = $(header).find('.catalog-product__name').text()
        const price = $(header).find('.product-buy__price').text()
        fridgeData.push({ title, price })
      })
    }

    const csv = convertToCSV(fridgeData)
    console.log(csv)
    
    fs.writeFile('result.csv', csv, err => { if (err) throw err })
  } catch(e) {
    console.log(chalk.red('Something going wrong...'))
    console.error(e)
  }
}
main()