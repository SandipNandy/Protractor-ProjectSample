//var XLSX = require('xlsx');
//var WorksheetLogin = workbook.Sheets['Login'];
let Rec_Approversanity = function () {

    this.Get = function (url) {
        browser.get(url);
    };
    
    let username1 = element(by.id('username'));
    this.enterUserName = function (U) {
        username1.sendKeys(U);
    };
    let password1 = element(by.id('password'));
    this.enterPassword = function (P) {
        password1.sendKeys(P);

    };
    let login = element(by.id('kc-login'));
    this.enterLogin = function () {
        login.sendKeys(protractor.Key.ENTER);

    };

    let clickcredential = element(by.xpath("//img[@class='avatar']"));
    this.click_credential = function () {
       return clickcredential;
    };
    let selectrole = element(by.css("div[class='cdk-overlay-pane'] div[role='menu']")).element(by.css("div[class='mat-menu-content'] div mat-form-field"));
    this.select_role = function () {
        selectrole.click();
    };
    //We need to change it to function
    let selectapprover = element(by.xpath("//div[contains(@class,'mat-select-panel mat-primary')]")).element(by.xpath("//mat-option/span[contains(text(),' Approver ')]"));
    this.select_approver = function () {
      selectapprover.click();
    };
    let selectassignprog = element(by.xpath("//div[contains(text(),'Pearson QA')]"));
    this.select_assignprog = function () {
        selectassignprog.click();
    };
    let selecthiddenfil = element(by.xpath("//ag-grid-angular[1]/div[1]/div[6]/div[1]/div[1]/div[@ref='tabHeader']/span[2]/span[1]"));
    this.select_hiddenfil = function () {
        selecthiddenfil.click();
    };
    let unselectsearch = element(by.xpath("//label[@ref='eSelectAllContainer']/span[contains(text(),'(Select All)')]"));
    this.unselect_search = function () {
    unselectsearch.click();
    };
    let searchrecgrp = element(by.css("input[placeholder='Search...']"));
    this.search_recgrp = function (searchrec) {
     searchrecgrp.sendKeys(searchrec);
    };
    let selectall = element(by.xpath("//label[@ref='eSelectAllContainer']/span[contains(text(),'(Select All)')]"));
    this.select_all = function () {
    selectall.click();
    };
    let applyfilter = element(by.css("button[ref='eApplyButton']"));
    this.apply_filter = function () {
        applyfilter.click();
    };
    let selectrectab = element(by.xpath("//span[contains(text(),'Recon')]"));
    this.select_rectab = function () {
        return selectrectab;
    };
    let selectriskopptab = element(by.xpath("//span[contains(text(),'Risk & Opportunities')]"));
    this.select_riskopptab = function () {
        return selectriskopptab;
    };
    let ClickRecGroupName=element(by.xpath("//span[contains(text(),'Rec Group Name')]"));
    this.Click_RecGroupName=function(){
          return ClickRecGroupName;
    };
    let ClickHiddenFilterForRecGroupName=element(by.xpath("//div[@col-id='recgroupname']/div[3]/span[1]/span[1]"));
    this.Click_HiddenFilter_ForRecGroupName=function(){
        ClickHiddenFilterForRecGroupName.click();
    };
    let SearchRecGroups=element(by.xpath("//ag-grid-angular[1]/div[1]/div[6]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/label[1]/span[1]"));
    this.Search_RecGroups=function(){
       return SearchRecGroups;
    };

    let ClickCommonProgram=element(by.xpath("//p[contains(text(),'PROGRAM')]"));
    this.Click_CommonProgram=function(){
        ClickCommonProgram.click();
    };
    let PresenceofRecGroupApprover=element(by.css("[ref='eCenterContainer'] div[row-index='0']"));
    this.Presence_ofRecGroup_Approver=function(){
         return PresenceofRecGroupApprover;
    };

    let ClickApprove=element(by.xpath("//span[contains(text(),'Approve')]"));
    this.Click_Approve=function(){
      return ClickApprove;
    };
    let ClickReasonName=element(by.css("mat-select[name='reasonName']"));
    this.Click_ReasonName=function(){
       ClickReasonName.click();
    };
    let SelectReasonName=element(by.xpath("//html[1]/body[1]/div[1]/div[4]/div[1]/div[1]/div[1]/mat-option[1]/span[1]"));
    this.Select_ReasonName=function(){
       return SelectReasonName;
    };
    let SubmitNotes=element(by.css("textarea[aria-label='submitNotes']"));
    this.Submit_Notes=function(SN){
        SubmitNotes.sendKeys(SN);
    };
    let ClickApproveButton=element(by.css("button[aria-label='APPROVE']"));
   this.Click_Approve_Button=function(){
    ClickApproveButton.click();
   };
   let ClickReject=element(by.xpath("//span[contains(text(),'Reject')]"));
   this.Click_Reject=function(){
       return ClickReject;
   };
   let ClickRejectButton=element(by.css("button[aria-label='REJECT']"));
   this.Click_RejectButton=function(){
   ClickRejectButton.click();
   };

   let AddComments=element(by.xpath("//div[@col-id='Comment']/span[1]/div[@title='Add Comment']"));
   this.Add_Comments=function(){
      return AddComments;
   };
let TypeMessages=element(by.css("input[placeholder='Type your message']"));
    this.Type_Messages=function(TYM){
         TypeMessages.sendKeys(TYM);
    };
    let PostMessage=element(by.xpath("//button[@mattooltip='Post Message']/span[//i]"));
    this.Post_Message=function(){
        PostMessage.click();
    };
    let ShowOnlyAttachements=element(by.xpath("//div[@class='h-100 o-y']//mat-icon[contains(text(),'check_box_outline_blank')]"));
    this.Show_Only_Attachements=function(){
        ShowOnlyAttachements.click();
    };
    let CloseReconLevelComment=element(by.xpath("//button[@aria-label='close-input-btn']/span[1]/mat-icon[@aria-label='close']"));
    this.Close_ReconLevel_Comment=function(){
        CloseReconLevelComment.click();
    };

    let ClickRecGrids=element(by.xpath("//span[contains(text(),'Rec Grids')]"));
    this.Click_RecGrids=function(){
        return ClickRecGrids;
    };

    let DownloadExcel=element(by.xpath("//app-table-actions/div[@fxlayout='row']/div[4]/button[@aria-label='act.tooltip']/span[1]/i[contains(@class,'-excel')]"));
    this.Download_Excel=function(){
      return  DownloadExcel;
    };
    let SelectSummaryButtonforCommentsAttachement=element.all(by.xpath("//div[@ref='cbSelectAll']/div/div/span")).get(0);
    this.SelectSummary_Buttonfor_CommentsAttachement=function(){
        return SelectSummaryButtonforCommentsAttachement;
    };
    let ClickMoreOptions=element(by.xpath("//span[contains(text(),'more options')]"));
    this.Click_MoreOptions=function(){
        return ClickMoreOptions;
    };
    let ClickAddCommentsInSummeryLevel=element.all(by.xpath("//i[contains(@class,'icon-line-comment')]")).get(1);
    this.Click_AddComments_InSummeryLevel=function(){
        return ClickAddCommentsInSummeryLevel;
    };

    let SignOut=element(by.xpath("//button[contains(text(),'Signout')]"));
    this.Sign_Out=function(){
         return SignOut;
    };

    let CheckUnexplainedRowAvailability1 = element(by.xpath("//div[contains(text(),'SHOW ALL (')]"));
    this.Availability_Of_SummaryComments_Attachment = function () {
        return CheckUnexplainedRowAvailability1;
    };

    let ShowingAllRows=element(by.xpath("//div[contains(text(),'Showing All Rows (')]"));
    this.Showing_All_Rows=function(){
       return ShowingAllRows;
    };
}
module.exports = new Rec_Approversanity();
