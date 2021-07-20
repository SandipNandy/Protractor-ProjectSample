//const { element } = require('protractor');
const { element } = require('protractor');
var XLSX = require('xlsx');
var workbook = XLSX.readFile('C:/Users/SandipNandi/Project/SingleTouchAutomationAvnet/ReconCore/PreparerReconAvnet.xlsx');
var WorksheetControlST = workbook.Sheets['ControlStatements'];

module.exports = {
    
    ChangeInto_PreparerRole: function (CIPR) {
        function capitalizeFirstLetter(string) {
            return string[0].toUpperCase() + string.slice(1);
        }
        var Matches = capitalizeFirstLetter(CIPR);
        element(by.xpath("//div[contains(@class,'mat-select-panel mat-primary')]")).element(by.xpath("//mat-option/span[contains(text(),'" + Matches + "')]")).click();
    },
    Click_OnProgramPreparerScreen: function (CPPS) {
        //var UpperCase = CPPS.toUpperCase();
        element(by.xpath("//div[@class='px-2 py-4']/div[contains(text(),'" + CPPS + "')]")).click();
    },
    Check_ALLExplained_And_UnexplainedAmount_InSummeryAndValidation: function () {

        let CountofVarianceAndUnexplained = element.all(by.xpath("//div[@class='o-y']/a"));
        CountofVarianceAndUnexplained.count().then((Count) => {
            console.log('CountofVarianceAndUnexplained :-' + Count + '\n');
            for (let w = 1; w <= Count; w++) {
                //let PlaceOfVarianceAndUnexplained = element.all(by.xpath("//div[@class='o-y']/a[" + w + "]/div[2]/ul/li"));
                // PlaceOfVarianceAndUnexplained.count().then((Place) => {
                var scrollToview = element(by.xpath("//div[@class='o-y']/a[" + w + "]/div[1]"));
                browser.executeScript("arguments[0].scrollIntoView()", scrollToview);
                let ft = element(by.xpath("//div[contains(@class,'p-1 summary-left')]"));
                ft.getText().then((tg) => {
                    console.log(tg + '\n' + '-----------------------------');

                });
                // console.log('PlaceOfVarianceAndUnexplained  :-' + Place + '\n');
                /*for (let x = 0; x < Place; x++) {
                    var j = 0
                    var PVAU = element.all(by.xpath("//div[@class='o-y']/a[" + w + "]/div[2]/ul/li/div[@class='fleft']")).get(x);
                    PVAU.getText().then((Tab1) => {
                        if (Tab1 == 'Variance (GL-SL)' || Tab1 == 'GL Line Items'||Tab1=='GL Lines') {
                            console.log(Tab1 + '------->');

                        }
                        else {
                            var STA = element.all(by.xpath("//div[@class='o-y']/a[" + w + "]/div[2]/ul/li/div[contains(@class,'fright')]")).get(j);
                            STA.getText().then((Tab2) => {
                                console.log(Tab1 + '-------->' + Tab2);
                            });
                            j++;
                        }
                    });
                }*/

                // });

            }
        });

    },
   
    Select_CategoryColumn_FromFilter: function () {
        if (WorksheetControlST['C10'].v == 'AVNET') {
            //return element(by.xpath("//div[@class='cdk-overlay-pane']//span[contains(text(),'- Category')]"));
            var ScrollToPoint=element(by.xpath("//div[@class='cdk-overlay-pane']//span[contains(text(),'Commentary')]"));
            browser.sleep(1000);
            browser.executeScript("arguments[0].scrollIntoView()", ScrollToPoint);
            browser.sleep(1000);
            return element(by.xpath("//div[@class='cdk-overlay-pane']//span[contains(text(),'Category')]"));
        }
        else {

            var ScrollToPoint=element(by.xpath("//div[@class='cdk-overlay-pane']//span[contains(text(),'Commentary')]"));
            browser.sleep(1000);
            browser.executeScript("arguments[0].scrollIntoView()", ScrollToPoint);
            browser.sleep(1000);
            return element(by.xpath("//div[@class='cdk-overlay-pane']//span[contains(text(),'- Category')or contains(text(),'_Category')]"));
        }
    },
    
    Column_ForEdit: function () {
        if (WorksheetControlST['C10'].v == 'AVNET') {
            /*Arr = ['Account Group', 'Profit Center', 'Amount in Group Currency', '- Category', '- Commentary'];
            for (let r = 0; r < 5; r++) {
                var ScrollToPoint = element(by.xpath("//span[contains(text(),'" + Arr[r] + "')]"));
                browser.executeScript("arguments[0].scrollIntoView()", ScrollToPoint);
            }*/
            var checkEdit = element.all(by.xpath("//div[contains(@col-id,'Edit')]")).get(0);
            browser.executeScript("arguments[0].scrollIntoView()", checkEdit);
            if (expect(checkEdit.getAttribute('col-id')).toMatch('Edit')) {
                var isAvailable = element(by.xpath("//div[@ref='eCenterContainer'and@role='rowgroup']/div[1]/descendant::div[contains(@col-id,'category Edit')]/span[1]"));
                isAvailable.isPresent().then((IA) => {
                    console.log('IA:-' + IA);
                    if (IA == true) {
                        browser.sleep(2000);
                        element(by.xpath("//div[@role='row']/div[@col-id='checkbox']/descendant::div[@ref='eWrapper']/input[@ref='eInput']/following-sibling::div/span[1]")).click();
                        browser.sleep(2000);
                        browser.executeScript("arguments[0].click()", isAvailable);

                    }
                });

            }
        }
        else {
            

            //Arr = ['GL Account', 'Company Code', 'Journal Source', 'Transaction Posted Date', 'Fiscal Period', 'Net Accounted Amount', 'Ageing', 'Category', '- Category', 'Commentary'];
            
            /*for (let r = 0; r < 10; r++) {
                var ScrollToPoint = element(by.xpath("//span[contains(text(),'" + Arr[r] + "')]"));
                ScrollToPoint.isPresent().then((w)=>{
                    if(w==true){
                browser.executeScript("arguments[0].scrollIntoView()", ScrollToPoint);
                    }
                });
            }*/

            var checkEdit = element.all(by.xpath("//div[contains(@col-id,'Edit')]")).get(0);
            browser.executeScript("arguments[0].scrollIntoView()", checkEdit);
            if (expect(checkEdit.getAttribute('col-id')).toMatch('Edit')) {
                var isAvailable = element(by.xpath("//div[@ref='eCenterContainer'and@role='rowgroup']/div[1]/descendant::div[contains(@col-id,'Edit')]/span[1]"));
                isAvailable.isPresent().then((IA) => {
                    console.log('IA:-' + IA);
                    if (IA == true) {
                        browser.sleep(2000);
                        element(by.xpath("//div[@role='row']/div[@col-id='checkbox']/descendant::div[@ref='eWrapper']/input[@ref='eInput']/following-sibling::div/span[1]")).click();
                        browser.sleep(2000);
                        browser.executeScript("arguments[0].click()", isAvailable);

                    }
                });

            }
        }


    },
    

}