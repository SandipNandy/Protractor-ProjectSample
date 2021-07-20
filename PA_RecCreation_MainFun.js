//const { by, element } = require('protractor');
var XLSX = require('xlsx');
var workbook1 = XLSX.readFile('C:/Users/SandipNandi/Project/SingleTouchAutomationAvnet/ReconCore/R2R Data Template for Rec Planning_Avnet.xlsx');
var WorksheetAddPrepare = workbook1.Sheets['Add_Prepare'];
var WorksheetAddReview = workbook1.Sheets['Add_Review'];
var WorksheetAddApprove = workbook1.Sheets['Add_Approve'];
var WorksheetControlSTF=workbook1.Sheets['Control_Statements'];
var WorksheetReconExecution = workbook1.Sheets['Recon Workflow, Allocation, Exe'];
var columnSelection = require('./ColmnSelection.js');
var reconCreationPOM = require('./PA_RecCreation_MainPom.js');


module.exports = {
    changeRole:function(CR){
        var Matches=CR.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        console.log('Matches :'+Matches);
        element(by.xpath("//div[contains(@class,'mat-select-panel mat-primary')]")).element(by.xpath("//mat-option/span[contains(text(),'"+Matches+"')]")).click();
    },
    mousemove_GlAccountOrFqan:function(glorfqan){
       return element(by.xpath("//span[contains(text(),'"+glorfqan+"')]"));
    },
    click_HiddenFilterLeftGLOrFqan:function(GlOrFqan){
       return element(by.xpath("//div[@col-id='"+GlOrFqan+"']/div[3]/span[1]/span[1]"));
    },
    mousemove_CompanyCodeOrEntity:function(EntityOrCCode){
      return  element(by.xpath("//span[@ref='eText' and contains(text(),'"+EntityOrCCode+"')]"));
    },

    clickHidden_filterRight_CompanyCodeOrEntity:function(CCodeOrEntity){
      return  element(by.xpath("//div[@col-id='"+CCodeOrEntity+"']/div[2]/span[1]/span[1]"));
    },



    Select_ProgramAdmin: function (PA) {
        element(by.xpath("//div[contains(@class,'mat-select-panel mat-primary')]")).element(by.xpath("//mat-option/span[contains(text(),'" + PA + "')]")).click();
    },
    Click_SearchedItems: function (ad) {
       
         return element(by.xpath("//div[@ref='eSetFilterList']/div[1]/descendant::label[@class='ag-set-filter-item']/span[contains(text(),'" + ad + "')]/preceding-sibling::div[@class='ag-filter-checkbox']"));   
       
    },
    Click_SearchedReconTypes: function (a,b) {
        if(WorksheetReconExecution['C'+b].v==='Inventory'&&element.all(by.xpath("//span[contains(text(),'Inventory')]")).count().then((t)=>{if(t>1){return true;}})){
            //console.log(WorksheetReconExecution['C'+b].v);
            //var inventory= element(by.xpath("//span[contains(text(),'Inventory')]"));
          // inventory.isPresent.then((p)=>{
                browser.sleep(1000);
                return element(by.xpath("//div[@ref='eSetFilterList']/div[1]/descendant::label[2]/span[contains(text(),'" + a + "')]/preceding-sibling::div[@class='ag-filter-checkbox']"));
               
           // });
         
        }
        else if( WorksheetReconExecution['C'+b].v==='Receivables'&&element.all(by.xpath("//span[contains(text(),'Receivables')]")).count().then((t)=>{if(t>1){return true;}})){
            browser.sleep(1000);
            return element(by.xpath("//div[@ref='eSetFilterList']/div[1]/descendant::label[2]/span[contains(text(),'"+ a +"')]/preceding-sibling::div[@class='ag-filter-checkbox']"));
        }
        //else if(WorksheetReconExecution['C'+b].v==='Branch Reconciliation V1'){
              // browser.sleep(1000);
              // return element(by.xpath("//div[@ref='eSetFilterList']/div[1]/descendant::label[2]/span[contains(text(),'"+ a +"')]/preceding-sibling::div[@class='ag-filter-checkbox']"));

          //  }
        else{
            browser.sleep(1000);
            return element(by.xpath("//div[@ref='eSetFilterList']/div[1]/descendant::label[@class='ag-set-filter-item']/span[contains(text(),'" + a + "')]/preceding-sibling::div[@class='ag-filter-checkbox']"));   
        }
    },
    select_RecTypeInDefineRecPlan: function (b,bb) {
    
        if(WorksheetReconExecution['C'+bb].v==='Inventory'||WorksheetReconExecution['C'+bb].v==='Receivables'){
             browser.sleep(1000);
             //element(by.xpath("//mat-option[16]/span[contains(text(),'" + b + "')]")).click();
            var getRecTypes= element.all(by.xpath("//span[contains(text(),'" + b + "')]"))
             getRecTypes.get(1).click();
        }
        /*else if(WorksheetReconExecution['C'+bb].v==='Receivables'){
            browser.sleep(1000);
            element(by.xpath("//mat-option[29]/span[contains(text(),'"+ b +"')]")).click();
        }*/
        else{
            browser.sleep(1000);
            element(by.xpath("//span[contains(text(),'" + b + "')]")).click(); 
        }
    },
    selectL1_PrepareDueDate: function (c) {
        element(by.xpath("//span[contains(text(),'" + c + "')]")).click();

    },
    prepare_1stLevelAdding: function (II) {
        
        //var Preparer1 = element(by.xpath("//div[@class='px-2']/child::p[contains(text(),'PREPARE')]/following::div[1]/mat-accordion[1]/mat-expansion-panel[1]/div[@role='region']//input[@placeholder='Enter Task Name']"));
        var Preparer1 = reconCreationPOM.prepare_TaskName();
        Preparer1.sendKeys(WorksheetReconExecution['F' + II].v);
        browser.sleep(5000);
        //var Preparer2 = element(by.xpath("//div[@class='px-2']/child::p[contains(text(),'PREPARE')]/following::div[1]/mat-accordion[1]/mat-expansion-panel[1]/div[@role='region']//a[contains(text(),'Define Submit Reason')]"));
        var Preparer2 = reconCreationPOM.clickPrepare_DefineReason();
        browser.actions().mouseMove(Preparer2).click().perform();
        browser.sleep(1000);
        //element(by.css("app-submit-reason div form input[class*='mat-input-element mat-form-field-autofill-control'][type='search']")).sendKeys("test");
        reconCreationPOM.give_PreparerDefineSubmitReason(WorksheetReconExecution['G' + II].v);
        //Element(by.xpath("//input[@id='mat-input-13'],'" + WorksheetLogin['F2'].v + "')]")).click();
        /*browser.sleep(3000);
        element(by.xpath("/html[1]/body[1]/div[1]/div[2]/div[1]/mat-dialog-container[1]/app-submit-reason[1]/div[1]/form[1]/div[2]/div[1]/div[1]/a[1]")).click();
        browser.sleep(3000);
        element(by.xpath("//body//div[@class='h-100']//div//div[2]//button[1]//span[1]//i[1]")).click();
        browser.sleep(3000);*/

        //element(by.xpath("//span[contains(text(),'SUBMIT')]")).click();
        reconCreationPOM.prepare_CLICKSUBMIT();
        browser.sleep(1000);

    },
    prepare_LevelAdding: function (row, d, NLP) {
        for (l = 1; l < (3 * NLP); l = l + 3) {
            var str = columnSelection.identName(l);
            var str1 = columnSelection.identName(l + 1);
            var str2 = columnSelection.identName(l + 2);
            var r = element(by.xpath("//div[@class='px-2']/child::p[contains(text(),'PREPARE')]/following::div[1]/descendant::mat-expansion-panel[" + (d + 1) + "]/descendant::mat-form-field[1]//div[3]/span[1]/label[1]/mat-label"));
            browser.actions().mouseMove(r).click().perform();
            //element(by.xpath("//span[contains(text(),'WD+6')]")).click();
            element(by.xpath("//span[contains(text(),'" + WorksheetAddPrepare[str + row].v + "')]")).click();

            //comparison:- //div[@class='px-2']/child::p[contains(text(),'PREPARE')]/following::div[1]/descendant::mat-expansion-panel[3]/descendant::mat-form-field[2]//div[3]/input[@placeholder='Enter Task Name']
            element(by.xpath("//div[@class='px-2']/child::p[contains(text(),'PREPARE')]/following::div[1]/descendant::mat-expansion-panel[" + (d + 1) + "]/descendant::mat-form-field[2]//div[3]/input[@placeholder='Enter Task Name']")).sendKeys(WorksheetAddPrepare[str1 + row].v);
            browser.sleep(1000);
            element(by.xpath("//div[@class='px-2']/child::p[contains(text(),'PREPARE')]/following::div[1]/descendant::mat-expansion-panel[" + (d + 1) + "]/div[1]/div[1]/div[1]/div[3]/a[contains(text(),'Define Submit Reason')]")).click();
            browser.sleep(1000);
            element(by.css("app-submit-reason div form input[class*='mat-input-element mat-form-field-autofill-control'][type='search']")).sendKeys(WorksheetAddPrepare[str2 + row].v);
            browser.sleep(1000);
            element(by.xpath("//span[contains(text(),'SUBMIT')]")).click();
            //browser.sleep(1000);
        }

    },
    delete_prepareLevel: function (e) {
        const expr = e;
        switch (expr) {
            case 1:
                element(by.xpath("//mat-expansion-panel[1]/div[1]/div[1]/div[2]/button[1]/mat-icon[contains(text(),'delete')]")).click();
                break;
            case 2:
                element(by.xpath("//mat-expansion-panel[2]/div[1]/div[1]/div[2]/button[1]/mat-icon[contains(text(),'delete')]")).click();
                break;
            case 3:
                element(by.xpath("//mat-expansion-panel[3]/div[1]/div[1]/div[2]/button[1]/mat-icon[contains(text(),'delete')]")).click();
                break;
            case 4:
                element(by.xpath("//mat-expansion-panel[4]/div[1]/div[1]/div[2]/button[1]/mat-icon[contains(text(),'delete')]")).click();
                break;
            default:
                console.log('Only 4 options are avialable to Delete in Preparer');
        }

    },
    reviewL1_SelectDueDate: function (f) {
       var SDD= element(by.xpath("//mat-option[contains(@id,'mat-option-')]/span[contains(text(),'" + f + "')]"));
       browser.sleep(1000);
       browser.executeScript("arguments[0].scrollIntoView();", SDD);
       browser.sleep(1000);
       browser.executeScript("arguments[0].click()",SDD);

    },
    review_1stLevelAdding:function(RLA){
       //browser.sleep(2000);
            // element(by.xpath("//span[contains(text(),'WD+6')]")).click();
            // browser.sleep(5000);
            //var q7 = element(by.xpath("//form[1]/div[2]/div[1]/div[2]/div[1]/mat-accordion[1]/mat-expansion-panel[1]//input[@placeholder='Enter Task Name']"));
            var q7=reconCreationPOM.reviewL1_TaskName();
            q7.sendKeys(WorksheetReconExecution['L'+RLA].v);
            browser.sleep(2000);
            //var q8 = element(by.xpath("//form[1]/div[2]/div[1]/div[2]/div[1]/mat-accordion[1]/mat-expansion-panel[1]//a[contains(text(),'Define Submit Reason')]"));
            var q8=reconCreationPOM.clickReviewL1_submitReason();
            browser.actions().mouseMove(q8).click().perform();
            browser.sleep(1000);
            //element(by.css("app-submit-reason div form input[class*='mat-input-element mat-form-field-autofill-control'][type='search']")).sendKeys("Accepting");
            reconCreationPOM.send_ReviewL1_ApproveReason(WorksheetReconExecution['M'+RLA].v);
            browser.sleep(2000);
            //element(by.xpath("//div[contains(text(),'REJECT')]")).click();
            reconCreationPOM.click_ReviewReject();
            browser.sleep(1000);
            //element(by.css("app-submit-reason div form input[class*='mat-input-element mat-form-field-autofill-control'][type='search']")).sendKeys("rejecting");
            reconCreationPOM.send_ReviewL1RejectReason(WorksheetReconExecution['N'+RLA].v);
            browser.sleep(2000);
            //element(by.xpath("//span[contains(text(),'SUBMIT')]")).click();
            reconCreationPOM.review_CLICKSUBMIT();
            browser.sleep(1000);


    },
    review_LevelAdding: function (row, g, NLR) {
        for (l = 1; l < (4 * NLR); l = l + 4) {
            var str = columnSelection.identName(l);
            var str1 = columnSelection.identName(l + 1);
            var str2 = columnSelection.identName(l + 2);
            var str3 = columnSelection.identName(l + 3)

            var t = element(by.xpath("//div[@class='px-2']/child::p[contains(text(),'REVIEW')]/following::app-checkbox[1]/following::div[1]/descendant::mat-expansion-panel[" + (g + 1) + "]/descendant::mat-form-field[1]//div[3]/span[1]/label[1]/mat-label"));
            browser.actions().mouseMove(t).click().perform();
            //browser.sleep(1000);
            element(by.xpath("//span[contains(text(),'" + WorksheetAddReview[str + row].v + "')]")).click();
            // browser.sleep(1000);
            //Actual Path:- //div[@class='px-2']/child::p[contains(text(),'REVIEW')]/following::app-checkbox[1]/following::div[1]/descendant::mat-expansion-panel[2]/descendant::mat-form-field[2]//div[3]/input[@placeholder='Enter Task Name']
            element(by.xpath("//div[@class='px-2']/child::p[contains(text(),'REVIEW')]/following::app-checkbox[1]/following::div[1]/descendant::mat-expansion-panel[" + (g + 1) + "]/descendant::mat-form-field[2]//div[3]/input[@placeholder='Enter Task Name']")).sendKeys(WorksheetAddReview[str1 + row].v);
            // browser.sleep(1000);
            element(by.xpath("//div[@class='px-2']/child::p[contains(text(),'REVIEW')]/following::app-checkbox[1]/following::div[1]/descendant::mat-expansion-panel[" + (g + 1) + "]/div[1]/div[1]/div[1]/div[2]/div[2]/a[contains(text(),'Define Submit Reason')]")).click();
            browser.sleep(1000);
            element(by.css("app-submit-reason div form input[class*='mat-input-element mat-form-field-autofill-control'][type='search']")).sendKeys(WorksheetAddReview[str2 + row].v);
            browser.sleep(1000);
            element(by.xpath("//div[contains(text(),'REJECT')]")).click();
            browser.sleep(2000);
            element(by.css("app-submit-reason div form input[class*='mat-input-element mat-form-field-autofill-control'][type='search']")).sendKeys(WorksheetAddReview[str3 + row].v);
            // browser.sleep(3000);
            element(by.xpath("//span[contains(text(),'SUBMIT')]")).click();
            //browser.sleep(3000);

        }
    },
    delete_ReviewLevel: function (h) {
        const expr = h;
        switch (expr) {
            case 1:
                element(by.xpath("//form[1]/div[2]/div[1]/div[2]/div[1]/mat-accordion[1]/mat-expansion-panel[1]/div[1]/div[1]/div[2]/button[1]/mat-icon[contains(text(),'delete')]")).click();
                break;
            case 2:
                element(by.xpath("//form[1]/div[2]/div[1]/div[2]/div[1]/mat-accordion[1]/mat-expansion-panel[2]/div[1]/div[1]/div[2]/button[1]/mat-icon[contains(text(),'delete')]")).click();
                break;
            case 3:
                element(by.xpath("//form[1]/div[2]/div[1]/div[2]/div[1]/mat-accordion[1]/mat-expansion-panel[3]/div[1]/div[1]/div[2]/button[1]/mat-icon[contains(text(),'delete')]")).click();
                break;
            case 4:
                element(by.xpath("//form[1]/div[2]/div[1]/div[2]/div[1]/mat-accordion[1]/mat-expansion-panel[4]/div[1]/div[1]/div[2]/button[1]/mat-icon[contains(text(),'delete')]")).click();
                break;
            default:
                console.log('Only 4 options are avialable to Delete in Review');
        }

    },
    approveL1_SelectDueDate: function (i) {
        element(by.xpath("//mat-option[contains(@id,'mat-option-')]/span[contains(text(),'" + i + "')]")).click();

    },
    approve_1stLevelAdding: function(ALA){
      
        var Approve2=reconCreationPOM.approveL1_taskName();
        Approve2.sendKeys(WorksheetReconExecution['S'+ALA].v);
        browser.sleep(2000);
        //var Approve3 = element(by.xpath("//div[@class='px-2']/child::p[contains(text(),'APPROVE')]/following::app-checkbox[1]/following::div[1]/descendant::mat-expansion-panel[1]/div[1]/div[1]/div[1]/div[2]/div[2]/a[contains(text(),'Define Submit Reason')]"));
        var Approve3=reconCreationPOM.clickApproveL1_submitReason();
        browser.actions().mouseMove(Approve3).click().perform();
        browser.sleep(1000);
        //element(by.css("app-submit-reason div form input[class*='mat-input-element mat-form-field-autofill-control'][type='search']")).sendKeys("Accepting");
        reconCreationPOM.send_ApproveL1_AcceptReason(WorksheetReconExecution['T'+ALA].v);
        browser.sleep(2000);
        //element(by.xpath("//div[contains(text(),'REJECT')]")).click();
        reconCreationPOM.click_ApproveReject();
        browser.sleep(2000);
        //element(by.css("app-submit-reason div form input[class*='mat-input-element mat-form-field-autofill-control'][type='search']")).sendKeys("rejecting");
        reconCreationPOM.send_ApproveL1RejectReason(WorksheetReconExecution['U'+ALA].v);
        browser.sleep(1000);
        //element(by.xpath("//span[contains(text(),'SUBMIT')]")).click();
        reconCreationPOM.approve_CLICKSUBMIT();
        browser.sleep(1000);

    },
    approve_LevelAdding: function (row, j, NLA) {
        for (l = 1; l < (4 * NLA); l = l + 4) {
            var str = columnSelection.identName(l);
            var str1 = columnSelection.identName(l + 1);
            var str2 = columnSelection.identName(l + 2);
            var str3 = columnSelection.identName(l + 3)
            var u = element(by.xpath("//div[@class='px-2']/child::p[contains(text(),'APPROVE')]/following::app-checkbox[1]/following::div[1]/descendant::mat-expansion-panel[" + (j + 1) + "]/descendant::mat-form-field[1]//div[3]/span[1]/label[1]/mat-label[contains(text(),'Choose Due Date')]"));
            browser.actions().mouseMove(u).click().perform();
            browser.sleep(1000);
            console.log(str + row);
            element(by.xpath("//span[contains(text(),'" + WorksheetAddApprove[str + row].v + "')]")).click();
            //Actual Path:- //div[@class='px-2']/child::p[contains(text(),'REVIEW')]/following::app-checkbox[1]/following::div[1]/descendant::mat-expansion-panel[2]/descendant::mat-form-field[2]//div[3]/input[@placeholder='Enter Task Name']
            browser.sleep(1000);
            element(by.xpath("//div[@class='px-2']/child::p[contains(text(),'APPROVE')]/following::app-checkbox[1]/following::div[1]/descendant::mat-expansion-panel[" + (j + 1) + "]/descendant::mat-form-field[2]//div[3]/input[@placeholder='Enter Task Name']")).sendKeys(WorksheetAddApprove[str1 + row].v);
            browser.sleep(1000);
            element(by.xpath("//div[@class='px-2']/child::p[contains(text(),'APPROVE')]/following::app-checkbox[1]/following::div[1]/descendant::mat-expansion-panel[" + (j + 1) + "]/div[1]/div[1]/div[1]/div[2]/div[2]/a[contains(text(),'Define Submit Reason')]")).click();
            browser.sleep(1000);
            element(by.css("app-submit-reason div form input[class*='mat-input-element mat-form-field-autofill-control'][type='search']")).sendKeys(WorksheetAddApprove[str2 + row].v);
            browser.sleep(1000);
            element(by.xpath("//div[contains(text(),'REJECT')]")).click();
            browser.sleep(1000);
            element(by.css("app-submit-reason div form input[class*='mat-input-element mat-form-field-autofill-control'][type='search']")).sendKeys(WorksheetAddApprove[str3 + row].v);
            browser.sleep(1000);
            element(by.xpath("//span[contains(text(),'SUBMIT')]")).click();
            browser.sleep(1000);

        }


    },
    delete_ApproveLevel: function (k) {

        const expr = k;
        switch (expr) {
            case 1:
                element(by.xpath("//form[1]/div[2]/div[1]/div[3]/div[1]/mat-accordion[1]/mat-expansion-panel[1]/div[1]/div[1]/div[2]/button[1]/mat-icon[contains(text(),'delete')]")).click();
                break;
            case 2:
                element(by.xpath("//form[1]/div[2]/div[1]/div[3]/div[1]/mat-accordion[1]/mat-expansion-panel[2]/div[1]/div[1]/div[2]/button[1]/mat-icon[contains(text(),'delete')]")).click();
                break;
            case 3:
                element(by.xpath("//form[1]/div[2]/div[1]/div[3]/div[1]/mat-accordion[1]/mat-expansion-panel[3]/div[1]/div[1]/div[2]/button[1]/mat-icon[contains(text(),'delete')]")).click();
                break;
            case 4:
                element(by.xpath("//form[1]/div[2]/div[1]/div[3]/div[1]/mat-accordion[1]/mat-expansion-panel[4]/div[1]/div[1]/div[2]/button[1]/mat-icon[contains(text(),'delete')]")).click();
                break;
            default:
                console.log('Only 4 options are avialable to Delete in Review');
        }

    },

    Select_RejectProcess: function (l) {
        element(by.xpath("//app-radio-group[1]/descendant::div[contains(text(),'" + l + "')]")).click();

    },
    select_AllocationMethod: function (m) {

        element(by.xpath("//mat-option/span[contains(text(),'" + m + "')]")).click();

    },

    select_Team: function (n) {
        element(by.xpath("//mat-option/span[contains(text(),'" + n + "')]")).click();
        //element(by.xpath("//span//text()[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),'"+ n +"')]")).click();

    },
    select_Users: function (o) {
        element(by.xpath("//span[contains(text(),'" + o + "')]")).click();
        //element(by.xpath("//span//text()[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),'"+ o +"')")).click();
    },
    select_RowNumber: function (p) {
       var Row= element(by.xpath("//mat-option[4]/span[contains(text(),'" + p + "')]"));
       browser.executeScript("arguments[0].click()", Row);

    },
    select_Frequency: function (q) {
        element(by.xpath("//div[@class='cdk-overlay-pane']/descendant::mat-option/span[contains(text(),'" + q + "')]")).click();

    },
    select_Period: function (r) {
        element(by.xpath("//div[@class='cdk-overlay-pane']/descendant::mat-option/span[contains(text(),'" + r + "')]")).click();

    },
    clickMonth_InManualExecution: function (s){
        //return element(by.xpath("//b[contains(text(),'"+s+"')]"));
        return element(by.xpath("//div[contains(text(),'/ "+s+"')]"));

    },
    PresenceOfRecGroups_In_ManualExecution: function(t){
       return element(by.xpath("//div[contains(text(),'" + t + "')]"));
    },
    uncheck_SelectedRec:function(){
        if(WorksheetControlSTF['C8'].v=='AUTOMATION'){
        return element(by.xpath("//div[@col-id='recTypes']/div[@ref='eCellWrapper']/span[1]/span[@class='ag-icon ag-icon-checkbox-checked']"));
    }
    else if(WorksheetControlSTF['C8'].v=='NEW QA'||WorksheetControlSTF['C8'].v=='STAGING'){
          return element(by.xpath("//div[@col-id='label']/div[@ref='eCellWrapper']/span[1]/span[@class='ag-icon ag-icon-checkbox-checked']"));
    }
},
clickhiddenfilter_RecTypes:function(){
    if(WorksheetControlSTF['C8'].v=='AUTOMATION'){
        return element(by.xpath("//div[@col-id='recTypes']/div[2]/span[1]/span[1]"));
    }
    else if(WorksheetControlSTF['C8'].v=='NEW QA'||WorksheetControlSTF['C8'].v=='STAGING'){
        return element(by.xpath("//div[@col-id='label']/div[2]/span[1]/span[1]"));
    }

},
clickhiddenfilter_RecTypes_WorkAllocation:function(){
    if(WorksheetControlSTF['C8'].v=='AUTOMATION'){
        return element(by.xpath("//div[@col-id='recTypes']/div[2]/span[1]/span[1]"));
    }
    else if(WorksheetControlSTF['C8'].v=='NEW QA'||WorksheetControlSTF['C8'].v=='STAGING'){
        return element(by.xpath("//div[@col-id='label']/div[2]/span[1]/span[1]"));
    }
},
Workflow_Recgroups_Filter:function(){
    if(WorksheetControlSTF['C8'].v=='AUTOMATION'){
        return element(by.xpath("//ag-grid-angular[2]/div[1]/div[6]/div[1]/div[1]/div[@ref='tabHeader']/span[2]/span[1]"));
    }
    else if(WorksheetControlSTF['C8'].v=='NEW QA'||WorksheetControlSTF['C8'].v=='STAGING'){
        return element(by.xpath("//ag-grid-angular[1]/div[1]/div[6]/div[1]/div[1]/div[@ref='tabHeader']/span[2]/span[1]"));
    }
},
WorkAllocation_RecGroupFilter:function(){
    if(WorksheetControlSTF['C8'].v=='AUTOMATION'){
        return element(by.xpath("//ag-grid-angular[2]/div[1]/div[6]/div[1]/div[1]/div[@ref='tabHeader']/span[2]/span[1]"));
    }
    else if(WorksheetControlSTF['C8'].v=='NEW QA'||WorksheetControlSTF['C8'].v=='STAGING'){
        return element(by.xpath("//ag-grid-angular[1]/div[1]/div[6]/div[1]/div[1]/div[@ref='tabHeader']/span[2]/span[1]"));
    }
},
clickPopUp_RecGroupsinWorkAllocation:function(){
    if(WorksheetControlSTF['C8'].v=='AUTOMATION'){
        return element(by.xpath("//ag-grid-angular[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/span[1]"));
    }
    else if(WorksheetControlSTF['C8'].v=='NEW QA'||WorksheetControlSTF['C8'].v=='STAGING'){
        return element(by.xpath("//ag-grid-angular[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/span[1]"));
    } 

},
WorkAllocation_Submit_ProofOf_Approval:function(AN){
    element(by.xpath("//input[@formcontrolname='approverName'and@type='search']")).sendKeys(AN);
    browser.sleep(1000);
    //element(by.xpath("//input[@formcontrolname='approverEmail'and@type='email']")).sendKeys(AE);
    //browser.sleep(1000);
    //element(by.xpath("//input[@formcontrolname='refTicketNumber']")).sendKeys(RTN);
    //browser.sleep(1000);
    //element(by.xpath("//textarea[@formcontrolname='comments']")).sendKeys(CMNT);
    //browser.sleep(1000);
    element(by.xpath("//mat-icon[@aria-label='check_box_outline_blank checkbox']")).click();
    browser.sleep(1000);
    element(by.xpath("//span[contains(text(),'SUBMIT')]")).click();

},


};