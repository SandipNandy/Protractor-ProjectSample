module.exports = {

    ChangeInto_ApproverRole:function(CIPR){
        function capitalizeFirstLetter(string) {
            return string[0].toUpperCase() + string.slice(1);
        }
        var Matches=capitalizeFirstLetter(CIPR);
        element(by.xpath("//div[contains(@class,'mat-select-panel mat-primary')]")).element(by.xpath("//mat-option/span[contains(text(),'" + Matches + "')]")).click();
    },
    Click_OnProgramApproverScreen:function(CPPS){
        //var t=translate(''+CPPS+'','abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ')
        //var UpperCase=CPPS.toUpperCase();
        var Matches=CPPS.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        element(by.xpath("//div[@class='px-2 py-4']/div[contains(text(),'" + Matches + "')]")).click();
    },
}