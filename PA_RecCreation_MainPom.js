const { element } = require("protractor");

let Rec_PAsanity = function () {
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
    let SearchProgram=element(by.css("input[placeholder='Search For Programs...']"));
    this.Search_Program=function(SP){
        SearchProgram.sendKeys(SP);
    };
    let ClickR2Rrecon=element(by.xpath("//div[contains(text(),'R2R | RECON')]"));
    this.Click_R2Rrecon=function(){
       ClickR2Rrecon.click();
    };
    //----------------------------------------------------------validation
    let validation = element(by.css("notifier-container div[type='notificationData.type']"));
    this.validation_GroupCreation = function () {
        return validation;
    };
    this.validation_workFlow = function () {
        return validation;
    };
    this.validation_workAllocation=function(){
        return validation;
    };
    this.validation_RecExePlan=function(){
      return validation;
    };
    this.validation_ManualExecution=function(){
      return validation;
    };
    this.validation_ProgramAdmin = function () {
        return validation;
    };
    let validationManageRecPlanGroupUpdate = element(by.xpath("//notifier-container/descendant::li[1]/descendant::div[@type='notificationData.type']"));
    this.validation_ManageRecPlan_GroupsUpdated = function () {
        return validationManageRecPlanGroupUpdate;
    };
    let validationManageRecPlanRecsGenerated = element(by.xpath("//notifier-container/descendant::li[2]/descendant::div[@type='notificationData.type']"));
    this.validation_ManageRecPlan_RecsGenerated = function () {
        return validationManageRecPlanRecsGenerated;
    };
    this.Validation_RecMapping = function () {
        return validation;
    };
    this.Validation_RecPublish = function () {
        return validation;
    };
    this.Validation_AllocateRecsIn_WorkAllocationAfterApply = function () {
        return validation;
    };
    let chooseFrequencyAndPeriod = element(by.css("app-choose-frequency-period h4"));
    this.choose_FrequencyAndPeriod = function () {
        return chooseFrequencyAndPeriod;
    };
    this.validation_Execution_Request_Submit = function () {
        return validation;
    };


    //-----------------------------------------------------------validation---------------------------------

    let clickDefineReconItem = element(by.xpath("//span[contains(text(),' Define Recon Item / Levels ')]"));
    this.clickDefin_ReconItem = function () {
        return clickDefineReconItem;
    };
    let clickManageRecGroups = element(by.xpath("//span[contains(text(),'Manage Rec Groups')]"));
    this.click_ManageRecGroups = function () {
        return clickManageRecGroups;
    };
    let clickDefineRecPlans = element(by.xpath("//span[contains(text(),'Define Rec Plans')]"));
    this.click_DefineRecPlans = function () {
        return clickDefineRecPlans

        //clickDefineRecPlans.click();
    };
    /*let mousemoveGlAccount = element(by.xpath("//span[contains(text(),'Fqan')]"));
    this.mousemove_GlAccountOrFqan=function(){
     return mousemoveGlAccount;
    };
    let clickHiddenFilterLeftGLacc=element(by.xpath("//div[@col-id='fqan']/div[3]/span[1]/span[1]"));
    this.click_HiddenFilterLeftGLOrFqan=function(){
    clickHiddenFilterLeftGLacc.click();
    };*/
    //........
    let realFilterUnderHiddenFilter = element(by.xpath("//div[@class='ag-menu ag-ltr']//div[@ref='tabHeader']/span[@class='ag-tab']/span[1]"));
    this.real_FilterUnderHiddenFilter = function () {
        return realFilterUnderHiddenFilter;
    };
    let SelectAll = element(by.xpath("//label[@ref='eSelectAllContainer']/span[contains(text(),'(Select All)')]"));
    this.uncheck_SelectAll = function () {
        return SelectAll;
    };
    this.check_All = function () {
        return SelectAll;
    };

    let clickSearchingFilter = element(by.css("input[placeholder='Search...']"));
    this.click_SearchFilter = function () {
        return clickSearchingFilter;
    };
    var clickApplyFilter = element(by.css("button[ref='eApplyButton']"));
    this.click_ApplyFilter = function () {
        clickApplyFilter.click();
    };
    this.click_ApplyFilterWorkflow_RecTypes = function () {
        return clickApplyFilter;
    };
    let UnappliedGroupName = element(by.xpath("//ag-grid-angular[1]/div[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[1]/div[1]"));
    this.Unapplied_GroupName = function () {
        return UnappliedGroupName;
    };
    let clickFirstFQANOrGLAccount = element(by.xpath("//app-create-rec-group[1]/div[1]/div[1]/div[1]/ag-grid-angular[1]/div[1]/div[2]/div[1]/div[3]/div[1]/div[1]/div[1]/div[1]/span[2]"));
    this.click_FirstFQANOrGlaccount = function () {
        return clickFirstFQANOrGLAccount;
    };
    //..........
    let topMostBoxForSelectingGLAccount = element(by.xpath("//app-create-rec-group[1]/div[1]//div[@ref='ePinnedLeftHeader']/descendant::div[@ref='eWrapper']/div[1]/span[contains(@class,'unchecked')]"));
    this.topMostBox_ForSelectingGLAccount = function () {
        topMostBoxForSelectingGLAccount.click();
    };
    let clickDefineItemsForGroups = element(by.xpath("//button/span[contains(text(),'Define Group For')]"));
    this.clickDefine_ItemsForGroups = function () {
        return clickDefineItemsForGroups;
        //clickDefineItemsForGroups.click();
    };
    let giveGroupName = element(by.css("input[name='groupLabel']"));
    this.give_GroupName = function (GN) {

        giveGroupName.sendKeys(GN);
    };
    let clickRecType = element(by.css("mat-select[name='recType']"));
    this.click_RecType = function () {
        clickRecType.click();
    };
    let clickCreateGroup = element(by.xpath("//span[contains(text(),'Create Group')]"));
    this.click_CreateGroup = function () {
        return clickCreateGroup;
        //clickCreateGroup.click();
    };

    let clickManageRecPlans = element(by.xpath("//span[contains(text(),'Manage Rec Plans')]"));
    this.click_ManageRecPlans = function () {
        return clickManageRecPlans;
        //clickManageRecPlans.click();
    };
    let clickRecGroupInLeftSide = element(by.xpath("//div[@ref='ePinnedLeftHeader']/descendant::div[@ref='eWrapper']/div[1]/span[contains(@class,'unchecked')]"));
    this.click_RecGroupInLeftSide = function () {
        return clickRecGroupInLeftSide;
        //clickRecGroupInLeftSide.click();
    };
    /*let mousemoveCompanyCode=element(by.xpath("//span[@ref='eText' and contains(text(),'')]"));
    this.mousemove_CompanyCode=function(){
         return mousemoveCompanyCode;
    };
    let clickHiddenfilterRightCompanyCode=element(by.xpath("//div[@col-id='companycode']/div[2]/span[1]/span[1]"));
    this.clickHidden_filterRight_CompanyCode=function(){
    clickHiddenfilterRightCompanyCode.click();
    };*/
    let clicktopboxofGlacc = element(by.xpath("//div[@ref='ePinnedLeftHeader']/descendant::div[@ref='eWrapper']/div[1]/span[contains(@class,'unchecked')]"));
    this.click_topboxofGlacc = function () {
        clicktopboxofGlacc.click();
    };

    let addCombine = element(by.xpath("//button/span[contains(text(),'Combine')]"));
    this.add_Combine = function () {
        return addCombine;
        //addCombine.click();
    };
    let addIndividual = element(by.xpath("//button/span[contains(text(),'Add Individual')]"));
    this.add_Individual = function () {
        return addIndividual;
        //addIndividual.click();
    };
    let applyGeneratePublishRecplan = element(by.xpath("//button/span[contains(text(),'Apply, Generate & Publish Rec Plans')]"));
    this.apply_Generate_PublishRecplan = function () {
        return applyGeneratePublishRecplan;
        //applyGeneratePublishRecplan.click();
    };
    let defineWorkFlow = element(by.xpath("//span[contains(text(),'Define Workflow')]"));
    this.define_Workflow = function () {
        defineWorkFlow.click();
    };
    let waitForRecTypesWorkFlow = element(by.xpath("//div[@ref='eCenterColsClipper']/div[@ref='eCenterViewport']/div[@ref='eCenterContainer']/div[@role='row' and @row-index='0']"));
    this.wait_ForRecTypesWorkFlow = function () {
        return waitForRecTypesWorkFlow;
    };
    let WorkFlowRecTypes=element(by.xpath("//ag-grid-angular[1]/div[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/span[2]"));
    this.WorkFlow_RecTypes=function(){
        return WorkFlowRecTypes;
    };
    let PresentRecGroupsInWorkFlow=element(by.xpath("//div[@role='row'and @row-index='0']/div[@col-id='recGroup']"));
    this.PresentRec_Groups_InWorkFlow=function(){
       return PresentRecGroupsInWorkFlow;
    };
    let NumberOfRecGroups=element(by.css("div[fxlayoutalign='space-between center'] div p[class='m-0 font-12'] span"));
    this.Number_Of_RecGroups=function(){
      return NumberOfRecGroups;
    };
    let AttentionPageInWorkFlow=element(by.xpath("//div[@class='cdk-overlay-pane']"));
    this.AttentionPage_InWorkFlow=function(){
         return AttentionPageInWorkFlow;
    };
    let DefineLevelRejectionPathInWorkFlow = element(by.xpath("//h4[contains(text(),'DEFINE LEVELS & REJECTION PATH')]"));
    this.DefineLevel_RejectionPath_InWorkFlow=function(){
        return DefineLevelRejectionPathInWorkFlow;
    };
    let WaitTillVisibilityOfRecGroupsInWorkFlow= element(by.css("svg[preserveAspectRatio='xMidYMid meet'] circle[class='ng-star-inserted']"));
    this.WaitTill_VisibilityOf_RecGroups_InWorkFlow=function(){
        return WaitTillVisibilityOfRecGroupsInWorkFlow;
    };
    /*let uncheckSelectedRec=element(by.xpath("//div[@col-id='recTypes']/div[@ref='eCellWrapper']/span[1]/span[@class='ag-icon ag-icon-checkbox-checked']"));
    //div[@ref='eLeftContainer']/div[@row-index='0']/descendant::span[1]/span[@class='ag-icon ag-icon-checkbox-checked']
    //let uncheckSelectedRec = element(by.xpath("//div[@col-id='label']/div[@ref='eCellWrapper']/span[1]/span[@class='ag-icon ag-icon-checkbox-checked']"));
    this.uncheck_SelectedRec = function () {
        //uncheckSelectedRec.click();
        return uncheckSelectedRec;
    };*/
    let GoInsideWorkAllocation=element(by.xpath("//ag-grid-angular[1]/div[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[@role='row' and @row-index='0']"));
    this.GoInside_WorkAllocation=function(){
        return GoInsideWorkAllocation;
    };
    let CheckRecTypesWorkAllocation=element(by.xpath("//ag-grid-angular[1]/div[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/span[2]"));
    this.Check_RecTypes_WorkAllocation=function(){
       return CheckRecTypesWorkAllocation;
    };
    let AttentionWorkAllocation=element(by.xpath("//div[@class='cdk-overlay-pane']"));
    this.Attention_WorkAllocation=function(){
          return AttentionWorkAllocation;
    };
   let AllocateRecsInWorkAllocation= element(by.xpath("//h4[contains(text(),'ALLOCATE RECS')]"));
   this.AllocateRecs_InWorkAllocation=function(){
           return AllocateRecsInWorkAllocation;
   };

    //mouse move Rec types-----------------------------------------------------------------
    let mousemoverecTypes = element(by.xpath("//div[@ref='eLabel']/span[contains(text(),'Rec Types')]"));
    //span[contains(text(),'REC TYPES')]
    this.mousemove_recTypes = function () {
        return mousemoverecTypes;
    };
    this.mousemove_recTypesWorkAllocation = function () {
        return mousemoverecTypes;
    };
    
  /*let clickhiddenfilterRecType=element(by.xpath("//div[@col-id='recTypes']/div[2]/span[1]/span[1]"));
    //let clickhiddenfilterRecType = element(by.xpath("//div[@col-id='label']/div[2]/span[1]/span[1]"));
    this.clickhiddenfilter_RecTypes = function () {
        return clickhiddenfilterRecType;
    };
    this.clickhiddenfilter_RecTypes_WorkAllocation = function () {
        clickhiddenfilterRecType.click();
    };*/
    let clickhiddenfilterRecTypeManualExecution = element(by.xpath("//div[@col-id='label']/div[2]/span[1]/span[1]"));
    this.clickhiddenfilter_RecTypes_ManualExecution = function () {
        clickhiddenfilterRecTypeManualExecution.click();
    };
    let clickPopupRectypesInworkflow = element(by.xpath("//div[@ref='eCenterContainer']/div[@row-index='0']/descendant::span[3]"));
    this.click_PopupRectypesInworkflow = function () {
        return clickPopupRectypesInworkflow;
    };
    let defineLevelsRejectionPath = element(by.xpath("//span[contains(text(),'Define Levels & Rejection Path')]"));
    this.define_LevelRjectionPath = function () {
        defineLevelsRejectionPath.click();
    };
    let attentionPopUp = element(by.css("div[class='cdk-overlay-pane']"));
    this.attention_PopUp = function () {
        return attentionPopUp;
    };
    let clickNoAttetion = element(by.css("button[aria-label='NO']"));
    this.click_NoAttention = function () {
        clickNoAttetion.click();
    };

    let clickYESAttention = element(by.css("button[aria-label='YES']"));
    this.click_YESAttention = function () {
        clickYESAttention.click();
    };


    let prepareDueDate = element(by.xpath("//div[@class='px-2']/child::p[contains(text(),'PREPARE')]/following::div[1]/mat-accordion[1]/mat-expansion-panel[1]/div[@role='region']//mat-form-field[1]/div[1]/div[1]/div[3]/span[1]/label[1]/mat-label[contains(text(),'Choose Due Date')]"));
    this.prepare_DueDate = function () {
        return prepareDueDate;
    };
    let prepareTaskName = element(by.xpath("//div[@class='px-2']/child::p[contains(text(),'PREPARE')]/following::div[1]/mat-accordion[1]/mat-expansion-panel[1]/div[@role='region']//input[@placeholder='Enter Task Name']"));
    this.prepare_TaskName = function () {
        return prepareTaskName;
    };
    let clickprepareDefineReason = element(by.xpath("//div[@class='px-2']/child::p[contains(text(),'PREPARE')]/following::div[1]/mat-accordion[1]/mat-expansion-panel[1]/div[@role='region']//a[contains(text(),'Define Submit Reason')]"));
    this.clickPrepare_DefineReason = function () {
        return clickprepareDefineReason;
    };
    let givepreparerDefineSubmitReason = element(by.css("app-submit-reason div form input[class*='mat-input-element mat-form-field-autofill-control'][type='search']"));
    this.give_PreparerDefineSubmitReason = function (DSR) {
        givepreparerDefineSubmitReason.sendKeys(DSR);
    };
    let CLICKSUBMIT = element(by.xpath("//span[contains(text(),'SUBMIT')]"));
    this.prepare_CLICKSUBMIT = function () {
        CLICKSUBMIT.click();
    };
    let preparerAddLevel = element(by.xpath("//div[@class='px-2']/child::p[contains(text(),'PREPARE')]/following::div[1]/descendant::button[contains(text(),'ADD LEVEL')]"));
    this.Prepare_AddLevel = function () {
        preparerAddLevel.click();
    };
    let skipReview = element(by.xpath("//div[@class='px-2']/child::p[contains(text(),' REVIEW ')]/following::app-checkbox[1]"))
    this.skip_Review = function () {
        return skipReview;
    };
    this.review_CLICKSUBMIT = function () {
        CLICKSUBMIT.click();
    };
    this.approve_CLICKSUBMIT = function () {
        CLICKSUBMIT.click();
    };
    let clickReviewL1dueDate = element(by.xpath("//div[@class='px-2']/child::p[contains(text(),'REVIEW')]/following::app-checkbox[1]/following::div[1]/descendant::mat-expansion-panel[1]/descendant::mat-form-field[1]//div[3]/span[1]/label[1]/mat-label[contains(text(),'Choose Due Date')]"));
    this.clickReviewL1_dueDate = function () {
        return clickReviewL1dueDate;
    };
    //let reviewL1taskName = element(by.xpath("//form[1]/div[2]/div[1]/div[2]/div[1]/mat-accordion[1]/mat-expansion-panel[1]//input[@placeholder='Enter Task Name']"));
    let reviewL1taskName=element(by.xpath("//form[1]/div[2]/div[1]/div[2]/div[1]/mat-accordion[1]/mat-expansion-panel[1]//input[@placeholder]"));
    this.reviewL1_TaskName = function () {
        return reviewL1taskName;
    };
    let clickReviewL1submitReason = element(by.xpath("//form[1]/div[2]/div[1]/div[2]/div[1]/mat-accordion[1]/mat-expansion-panel[1]//a[contains(text(),'Define Submit Reason')]"));
    this.clickReviewL1_submitReason = function () {
        return clickReviewL1submitReason;
    };
    let skipApprove = element(by.xpath("//div[@class='px-2']/child::p[contains(text(),'APPROVE')]/following::app-checkbox[1]"));
    this.skip_Approve = function () {
        return skipApprove;
    };

    let ApproveReason = element(by.css("app-submit-reason div form input[class*='mat-input-element mat-form-field-autofill-control'][type='search']"));
    this.send_ReviewL1_ApproveReason = function (RAR) {
        ApproveReason.sendKeys(RAR);
    };
    this.send_ApproveL1_AcceptReason = function (AAR) {
        ApproveReason.sendKeys(AAR);
    };
    let clickReject = element(by.xpath("//div[contains(text(),'REJECT')]"));
    this.click_ReviewReject = function () {
        clickReject.click();
    };
    this.click_ApproveReject = function () {
        clickReject.click();
    };
    let sendRejectReason = element(by.css("app-submit-reason div form input[class*='mat-input-element mat-form-field-autofill-control'][type='search']"));
    this.send_ReviewL1RejectReason = function (RRR) {
        sendRejectReason.sendKeys(RRR);
    };
    this.send_ApproveL1RejectReason = function (ARR) {
        sendRejectReason.sendKeys(ARR);
    };

    let clickApproveAddLevel = element(by.xpath("//div[@class='px-2']/child::p[contains(text(),'APPROVE')]/following::app-checkbox[1]/following::div[1]/descendant::button[contains(text(),'ADD LEVEL')]"));
    this.approve_AddLevel = function () {
        return clickApproveAddLevel;

    }


    let reviewAddLevel = element(by.xpath("//div[@class='px-2']/child::p[contains(text(),'REVIEW')]/following::app-checkbox[1]/following::div[1]/descendant::button[contains(text(),'ADD LEVEL')]"));
    this.review_AddLevel = function () {
        return reviewAddLevel;
    };

    clickApproveL1dueDate = element(by.xpath("//div[@class='px-2']/child::p[contains(text(),'APPROVE')]/following::app-checkbox[1]/following::div[1]/descendant::mat-expansion-panel[1]/descendant::mat-form-field[1]//div[3]/span[1]/label[1]/mat-label[contains(text(),'Choose Due Date')]"));
    this.click_ApproveL1dueDate = function () {
        return clickApproveL1dueDate;
    };
    //let approveL1taskName = element(by.xpath("//div[@class='px-2']/child::p[contains(text(),'APPROVE')]/following::app-checkbox[1]/following::div[1]/descendant::mat-expansion-panel[1]/descendant::mat-form-field[2]//div[3]/input[@placeholder='Enter Task Name']"));
    let approveL1taskName=element(by.xpath("//div[@class='px-2']/child::p[contains(text(),'APPROVE')]/following::app-checkbox[1]/following::div[1]/descendant::mat-expansion-panel[1]/descendant::mat-form-field[2]//div[3]/input[@placeholder]"))
    this.approveL1_taskName = function () {
        return approveL1taskName;
    };
    let clickApproveL1submitReason = element(by.xpath("//div[@class='px-2']/child::p[contains(text(),'APPROVE')]/following::app-checkbox[1]/following::div[1]/descendant::mat-expansion-panel[1]/div[1]/div[1]/div[1]/div[2]/div[2]/a[contains(text(),'Define Submit Reason')]"));
    this.clickApproveL1_submitReason = function () {
        return clickApproveL1submitReason;
    };
    let goToRejectionpath = element(by.xpath("//p[contains(text(),'REJECTION PATH')]"));
    this.goTo_Rejectionpath = function () {
        return goToRejectionpath;
    };
    let clickApplyworkFlow = element(by.css("button[type='submit']"));
    this.clickApplyworkFlow = function () {
        clickApplyworkFlow.click();
    };
    let clickPublishForAllocationWorkflow = element(by.xpath("//span[contains(text(),'PUBLISH FOR ALLOCATION')]"));
    this.click_PublishForAllocationWorkflow = function () {
        clickPublishForAllocationWorkflow.click();
    };
    //horizontal lines before IBM Logo -> work flow section------------------------------
    let clickHorizontallines = element(by.xpath("//span/mat-icon[contains(text(),'menu')]"));
    this.click_Horizontallines = function () {
        clickHorizontallines.click();
    };
    //work allocation----------------------------------------------
    let clickWorkAllocation = element(by.xpath("//span[contains(text(),'Work Allocation')]"));
    this.click_WorkAllocation = function () {
        clickWorkAllocation.click();
    };
    let waitForRecTypesWorkAllocation = element(by.xpath("//div[@ref='eCenterColsClipper']/div[@ref='eCenterViewport']/div[@ref='eCenterContainer']/div[@role='row' and @row-index='0']"));
    this.wait_ForRecTypesWorkAllocation = function () {
        return waitForRecTypesWorkAllocation;
    };
    //Uncheck Work Allocation rec types--------------------------------------------
    let UncheckWorkAllocationRecTypes = element(by.xpath("//ag-grid-angular[1]/div[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]/span[1]"));
    this.Uncheck_WorkAllocationRecTypes = function () {
        return UncheckWorkAllocationRecTypes;
    };
    //Click on the pop up result in the Rec Types section
    let popupRecTypeWorkAllocation = element(by.xpath("//div[@ref='eCenterContainer']/div[@row-index='0']/descendant::span[3]"));
    this.popup_RecTypeWorkAllocation = function () {
        return popupRecTypeWorkAllocation;
    };
    let clickUappliedHiddenfilterGroupName = element(by.xpath("//div[@col-id='groupName']/div[3]/span[1]/span[1]"));
    this.click_UnappliedHiddenFilter = function () {
        clickUappliedHiddenfilterGroupName.click();
    };
    //mouse move REC Group-work allocation
    let mousemoveRecGroups = element(by.xpath("//span[contains(text(),'REC GROUPS')]"));
    this.mousemove_RecGroups = function () {
        return mousemoveRecGroups;
    };

    let clickhiddenfilterRecGroups = element(by.xpath("//div[@col-id='recGroup']/div[3]/span[1]/span[1]"));
    this.click_hiddenfilter_RecGroups_WorkAllocation = function () {
        clickhiddenfilterRecGroups.click();
    };
    let clickhiddenfilterRecGroupsME = element(by.xpath("//div[@col-id='groupName']/div[3]/span[1]/span[1]"));
    this.click_hiddenfilter_RecGroups_ManualExecution = function () {
        clickhiddenfilterRecGroupsME.click();
    };
    this.click_hiddenfilter_RecGroups_WorkFlow = function () {
        return clickhiddenfilterRecGroups;
    };
    let PopUpRecGroupsinWorkAllocation = element(by.xpath("//div[@role='row'and@row-index='0']/div[@col-id='recGroup']"));
    //let clickPopUpRecGroupsinWorkAllocation=element(by.xpath("//ag-grid-angular[1]//div[@ref='eLeftContainer']/div[@row-index='0']/descendant::span[3]"));
    this.PopUp_RecGroupsinWorkAllocation = function () {
        return PopUpRecGroupsinWorkAllocation;
    };
   /*//let clickPopUpRecGroupsinWorkAllocation = element(by.xpath("//ag-grid-angular[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/span[1]"));
    let clickPopUpRecGroupsinWorkAllocation= element(by.xpath("//ag-grid-angular[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/span[1]"));
    this.clickPopUp_RecGroupsinWorkAllocation = function () {
        return clickPopUpRecGroupsinWorkAllocation;
    };*/
    let clickAllocateRecs = element(by.xpath("//a[@ele-id='lr-Allocate Recs']/span[contains(text(),'Allocate Recs')]"));
    this.click_AllocateRecs = function () {
        clickAllocateRecs.click();
    };

    let clickChooseAllocation = element(by.xpath("//form[1]/div[@class='level-selection']/div[1]/div[1]/descendant::mat-accordion[1]/descendant::div[@role='region']/descendant::div[4]/descendant::mat-form-field[3]/descendant::div[2]/div[3]/span[1]/label[1]/mat-label"));
    this.click_ChooseAllocation = function () {
        return clickChooseAllocation;
    };
    let clickSelectTeam = element(by.xpath("//form[1]/div[@class='level-selection']/div[1]/div[1]/descendant::mat-accordion[1]/descendant::div[@role='region']/descendant::div[contains(@class,'my-2')]/div[1]/mat-form-field[1]/div/div/div[3]/span/label/mat-label"));
    this.click_SelectTeam = function () {
        return clickSelectTeam;
    };
    let clickAddUsers = element(by.css("mat-select[id='allocationUserName']"));
    this.click_AddUsers = function () {
        return clickAddUsers;
    };
    let clickReviewAllocationType = element(by.css("mat-select[name='reviewAllocationType']"));
    this.click_ReviewAllocationType = function () {
        return clickReviewAllocationType;
    };
    let clickProgramTeamReview = element(by.xpath("//form[1]/div[@class='level-selection']/div[1]/div[2]/descendant::mat-accordion[1]/descendant::div[@role='region']/descendant::div[contains(@class,'my-2')]/div[1]/mat-form-field[1]/div/div/div[3]/span/label/mat-label"));
    this.click_ProgramTeamReview = function () {
        return clickProgramTeamReview;
    };
    let clickAddUserReview = element(by.xpath("//form[1]/div[@class='level-selection']/div[1]/div[2]/descendant::mat-accordion[1]/descendant::div[@role='region']/descendant::div[contains(@class,'my-2')]/div[2]/mat-form-field[1]/div/div/div[3]/span/label/mat-label"));
    this.click_AddUserReview = function () {
        return clickAddUserReview;
    };
    let clickApproveAllocation = element(by.xpath("//form[1]/div[@class='level-selection']/div[1]/div[3]/descendant::mat-accordion[1]/descendant::div[@role='region']/descendant::div[4]/descendant::mat-form-field[3]/descendant::div[2]/div[3]/span[1]/label[1]/mat-label"));
    this.click_Approve_Allocation = function () {
        return clickApproveAllocation;
    };
    let clickApproveTeamSelection = element(by.xpath("//form[1]/div[@class='level-selection']/div[1]/div[3]/descendant::mat-accordion[1]/descendant::div[@role='region']/descendant::div[contains(@class,'my-2')]/div[1]/mat-form-field[1]/div/div/div[3]/span/label/mat-label"));
    this.click_ApproveTeamSelection = function () {
        return clickApproveTeamSelection;
    };
    let clickApproveAddUsers = element(by.xpath("//form[1]/div[@class='level-selection']/div[1]/div[3]/descendant::mat-accordion[1]/descendant::div[@role='region']/descendant::div[contains(@class,'my-2')]/div[2]/mat-form-field[1]/div/div/div[3]/span/label/mat-label"));
    this.click_ApproveAddUsers = function () {
        return clickApproveAddUsers;
    };
    let clickApplyWorkAllocation = element(by.xpath("//button[@type='submit']/span[contains(text(),'Apply')]"));
    this.click_ApplyWorkAllocation = function () {
        clickApplyWorkAllocation.click();
    };
    let clickPublishWorkAllocation = element(by.xpath("//span[contains(text(),'Publish')]"));
    this.click_PublishWorkAllocation = function () {
        clickPublishWorkAllocation.click();
    };
    //-----Manual Execution------------------------

    let clickManualExecution = element(by.xpath("//span[contains(text(),'Manual Execution')]"));
    this.click_ManualExecution = function () {
        clickManualExecution.click();
    };
    let clickdefaultrow10 = element(by.xpath("//mat-select[@aria-label='Rows Per Page']/descendant::span[contains(text(),'10')]"));
    this.click_Defaultrow10 = function () {
        return clickdefaultrow10;
    };
    let MultipleRecSelection = element(by.xpath("//span[.//mat-icon[contains(text(),'check_box')]]"));
    this.Multiple_RecSelection = function () {
        MultipleRecSelection.click();
    };
    let UncheckAlldefaultSelectedRecon = element(by.xpath("//ag-grid-angular[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]"));
    this.Uncheck_Alldefault_SelectedRecon = function () {
        UncheckAlldefaultSelectedRecon.click();
    };

    let clickPopUpRecTypeManualExecution = element(by.xpath("//ag-grid-angular[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]"));
    this.click_PopUpType_ManualExecution = function () {
        clickPopUpRecTypeManualExecution.click();
    };
   // let selectAllRecGroups = element(by.xpath("//ag-grid-angular[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/span[1]"));
    let selectAllRecGroups=element(by.xpath("//ag-grid-angular[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/span[1]"))
    this.select_AllRecGroups = function () {
        selectAllRecGroups.click();
    };
    let clickOnPopUpRecGroupsInExecution = element(by.xpath("//app-bulk-exe-recs[1]/div[1]/div[2]/div[2]/div[1]/div[1]/ag-grid-angular[1]/descendant::span[@class='ag-icon ag-icon-checkbox-unchecked']"));
    this.click_OnPopUpRecGroup_InManualExcution = function () {
        clickOnPopUpRecGroupsInExecution.click();
    };
    let clickOnClearSection = element(by.xpath("//span[contains(text(),'Clear Selection')]"));
    this.click_OnClearSection = function () {
        clickOnClearSection.click();
    };
    /*let clickExecuteSelectedRecs= element(by.xpath("//span[contains(text(),'Execute Selected Recs')]"))
    this.click_ExecuteSelectedRecs=function(){
    clickExecuteSelectedRecs.click();
    };*/
    let clickOnChooseFrequency = element(by.xpath("//mat-label[contains(text(),'Choose Frequency')]"));
    this.click_OnChooseFrequency = function () {
        return clickOnChooseFrequency;
    };
    let clickOnPeriod = element(by.xpath("//mat-label[contains(text(),'Choose Period')]"));
    this.click_Period = function () {
        clickOnPeriod.click();
    };
    let clickSubmitOnManualExecution = element(by.xpath("//mat-dialog-container[@role='dialog']/app-choose-frequency-period/descendant::span[contains(text(),'Submit')]"));
    this.click_SubmitOn_ManualExecution = function () {
        clickSubmitOnManualExecution.click();
    };
   /* let RecgroupsFilter=element(by.xpath("//ag-grid-angular[2]/div[1]/div[6]/div[1]/div[1]/div[@ref='tabHeader']/span[2]/span[1]"));
    //let RecgroupsFilter = element(by.xpath("//ag-grid-angular[1]/div[1]/div[6]/div[1]/div[1]/div[@ref='tabHeader']/span[2]/span[1]"));

    this.Workflow_Recgroups_Filter = function () {
        RecgroupsFilter.click();
    };
    this.WorkAllocation_RecGroupFilter = function () {
        RecgroupsFilter.click();
    };*/

    let ReconNameAvailable = element.all(by.xpath("//div[@ref='eCenterContainer'and @role='rowgroup'and@style='width: 2000px; height: 40px;']/div[@role='row']"));
    this.ReconName_Available = function () {
        return ReconNameAvailable;
    };
    let CommonProgram = element(by.xpath("//p[contains(text(),'PROGRAM')]"));
    this.Common_Program = function () {
        CommonProgram.click();
    };

    let ClickRecExecutionPlan = element(by.xpath("//span[contains(text(),'Rec Execution Plan')]"));
    this.Click_RecExecutionPlan = function () {
        return ClickRecExecutionPlan;
    };
    let UncheckRecTypesRecExecutionPlan = element(by.xpath("//ag-grid-angular[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]"));
    this.Uncheck_RecTypesRecExecutionPlan = function () {
        UncheckRecTypesRecExecutionPlan.click();
    };
    let MouseMoveRecPlanRecTypes = element(by.xpath("//span[contains(text(),'Rec Types')]"));
    this.MouseMove_RecPlanRecTypes = function () {
        return MouseMoveRecPlanRecTypes;
    };
    let HiddenFilterRecExecutionPlanAndStatus = element(by.xpath("//ag-grid-angular[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/span[1]/span[1]"));
    this.HiddenFilter_RecExecutionPlan = function () {
        HiddenFilterRecExecutionPlanAndStatus.click();
    };
    this.HiddenFilter_RecExecutionStatus = function () {
        return HiddenFilterRecExecutionPlanAndStatus;
    };
    let mouseMoveGroupOnRecExecutionPlanAndManualExecution = element(by.xpath("//span[contains(text(),'Group')]"));
    this.mouseMove_GroupOnRecExecutionPlan = function () {
        return mouseMoveGroupOnRecExecutionPlanAndManualExecution;
    };
    this.mouseMove_GroupOnManualExecution = function () {
        return mouseMoveGroupOnRecExecutionPlanAndManualExecution;
    };
    let clickHiddenFilterOfGroup = element(by.xpath("//ag-grid-angular[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[3]/span[1]/span[1]"));
    this.click_HiddenFilterOfGroupInRecExecutionPlan = function () {
        return clickHiddenFilterOfGroup;
    };
    this.click_HiddenFilterOfGroupIn_ManualExecution = function () {
        return clickHiddenFilterOfGroup;
    };
    let presenceOfGroupRecExecutionPlan = element(by.xpath("//app-view-recs[1]/div[1]/div[1]/div[1]/ag-grid-angular[1]/div[1]/div[2]/div[1]/div[3]//div[@ref='eCenterContainer'and@role='rowgroup']/div[@role='row'and@row-index='0']"));
    this.presenceOf_GroupRecExecutionPlan = function () {
        return presenceOfGroupRecExecutionPlan;
    };
    let SelectThePopupGroupInRecExecutionPlan = element(by.xpath("//ag-grid-angular[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/span[1]"));
    //let SelectThePopupGroupInRecExecutionPlan=element(by.xpath("//ag-grid-angular[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/span[1]"));
    this.Select_ThePopupGroupInRecExecutionPlan = function () {
        return SelectThePopupGroupInRecExecutionPlan;
    };
    let WaitForAssignPeriodTabInRecExecutionPlan = element(by.xpath("//mat-toolbar[contains(@class,'paginator-toolbar-selection mat-toolbar')]"));
    this.WaitForAssign_PeriodTab_InRecExecutionPlan = function () {
        return WaitForAssignPeriodTabInRecExecutionPlan;
    };
    let ClickAssignPeriod = element(by.xpath("//span[contains(text(),'Assign Period')]"));
    this.Click_AssignPeriod = function () {
        ClickAssignPeriod.click();
    };
    let AssignPeriodSearchBar = element(by.css("[placeholder='Search For Columns...']"));
    this.Assign_PeriodSearchBar = function (APSB) {
        AssignPeriodSearchBar.sendKeys(APSB);
    };
    let SelectPopUpAssignBar = element(by.xpath("//mat-card/cdk-virtual-scroll-viewport/div[1]/div[1]/div[1]"));
    this.Select_PopUpAssignPeriod = function () {
        SelectPopUpAssignBar.click();
    };
    let ClickAssignRecExecutionPlan = element(by.xpath("//button[@class='mat-stroked-button mat-primary']/span[contains(text(),'Assign')]"));
    this.Click_AssignRecExecutionPlan = function () {
        ClickAssignRecExecutionPlan.click();
    };
    let RecNumberInRecExecutionPlan = element(by.css("div[class='h-100'] mat-toolbar[fxlayoutalign='start center'] span[style='margin-right: 20px;']"));
    this.RecNumber_InRecExecutionPlan = function () {
        return RecNumberInRecExecutionPlan;
    };
    let NextPageRecExecutionPlan = element(by.xpath("//button[@aria-label='Next page']/span[1]"));
    this.NextPage_RecExecutionPlan = function () {
        return NextPageRecExecutionPlan;
    };
    let ClickNonExecuted = element(by.css("mat-icon[aria-label='radio_button_unchecked radio']"));
    this.Click_NonExecuted = function () {
        return ClickNonExecuted;
    };
    let ClickArrowInManualExecutionToSelectMonth = element(by.xpath("//app-global-title-header/mat-toolbar[1]/div[2]/nav[1]/div[3]/div[1]"));
    this.ClickArrow_InManualExecution_ToSelectMonth = function () {
        ClickArrowInManualExecutionToSelectMonth.click();
    };
    let NumberOfNonExecutedRowInManualExecution = element.all(by.xpath("//app-show-recs-by-ids[1]/div[1]/div[1]/div[1]/ag-grid-angular[1]/div[1]/div[2]/div[1]/div[3]//div[@role='rowgroup']/div[@role='row']"));
    this.NumberOf_NonExecutedRow_InManualExecution = function () {
        return NumberOfNonExecutedRowInManualExecution;
    };
    let CheckGroupNameInManualExecution = element(by.xpath("//div[@ref='eCenterContainer']/div[@role='row']/div[@role='gridcell'and @col-id='groupName']"));
    this.Check_GroupName_InManualExecution = function () {
        return CheckGroupNameInManualExecution;
    };
    let ClickOnPopUpGroupsInManualExecution = element(by.xpath("//div[@col-id='entityId']/div[2]/div[@ref='eWrapper']/div[1]/span[contains(@class,'-checkbox-unchecked')]"));
    this.ClickOnPopUp_Groups_InManualExecution = function () {
        return ClickOnPopUpGroupsInManualExecution;
    };
    let WaitForExecuteBarInManualExecution = element(by.xpath("//mat-toolbar[contains(@class,'paginator-toolbar-selection mat-toolbar')]"));
    this.WaitFor_ExecuteBar_InManualExecution = function () {
        return WaitForExecuteBarInManualExecution;
    };
    let ClickOnExecuteButtonInMnualExecution = element(by.xpath("//span[contains(text(),'Execute')]"));
    this.ClickOn_ExecuteButton_InMnaualExecution = function () {
        ClickOnExecuteButtonInMnualExecution.click();
    };
    let ClickOnYESafterExecuteInManualExecution = element(by.xpath("//div[@class='cdk-overlay-pane']//button[@aria-label='YES']"));
    this.ClickOn_YESAfter_ExecuteInManualExecution = function () {
        ClickOnYESafterExecuteInManualExecution.click();
    };

    //Rec Execution Status Part

    let CheckLogInPage = element(by.css("h1[id='kc-page-title']"));
    this.Check_LogInPage = function () {
        return CheckLogInPage;
    };
    let HomePagePrograms = element(by.xpath("//div[contains(text(),'Programs')]"));
    this.HomePage_Programs = function () {
        return HomePagePrograms;
    };

    let ClickRecExecutionStatus = element(by.xpath("//span[contains(text(),' Rec Execution Status ')]"));
    this.Click_RecExecutionStatus = function () {
        return ClickRecExecutionStatus;
    };
    let Click50 = element(by.xpath("//mat-select[@aria-label='Rows Per Page']/descendant::span[contains(text(),'50')]"));
    this.Click_50 = function () {
        return Click50;
    };
    let ChangeInto200 = element(by.xpath("//span[contains(text(),'200')]"));
    this.Change_Into200 = function () {
        ChangeInto200.click();
    };
    let MouseMoveRecExecutionStatusRecTypes = element(by.xpath("//span[contains(text(),'Rec Types ')]"));
    this.MouseMove_RecExecutionStatusRecTypes = function () {
        return MouseMoveRecExecutionStatusRecTypes;
    };
    let RecGroupNameInRecExecutionStatus = element(by.xpath("//span[contains(text(),'Rec Group Name')]"));
    this.RecGroupName_InRec_ExecutionStatus = function () {
        return RecGroupNameInRecExecutionStatus;
    };
    let HiddenFilterClickInRecGroupNameInRecExecutionStatus = element(by.xpath("//div[@title='Rec Group Name']/div[3]/span[@ref='eMenu']/span[1]"));
    this.HiddenFilter_ClickInRecGroupName_InRecExecutionStatus = function () {
        HiddenFilterClickInRecGroupNameInRecExecutionStatus.click();
    };

    let CheckRecGroupNameInRecExecutionStatus = element(by.xpath("//div[@role='row'and @row-index='0']/div[@col-id='recGrpName']"));
    this.Check_RecGroupName_InExecutionStatus = function () {
        return CheckRecGroupNameInRecExecutionStatus;
    };
    let ScrollToGLaccountInRecExecutionStatus = element(by.xpath("//span[contains(text(),'glaccount')]"));
    this.ScrollTo_GLaccount_InRecExecutionStatus = function () {
        return ScrollToGLaccountInRecExecutionStatus;
    };
    let ScrollToCompanyCodeInRecExecutionStatus = element(by.xpath("//span[contains(text(),'companycode')]"));
    this.ScrollTo_CompanyCode_InRecExecutionStatus = function () {
        return ScrollToCompanyCodeInRecExecutionStatus;
    };
    let ScrollToQueueNoInRecExecutionStatus = element(by.xpath("//span[contains(text(),'Queue No.')]"));
    this.Scroll_ToQueueNo_InRecExecutionStatus = function () {
        return ScrollToQueueNoInRecExecutionStatus;
    };
    let ScrollToStateInRecExecutionStatus = element(by.xpath("//span[contains(text(),'State')]"));
    this.Scroll_ToState_InRecExecutionStatus = function () {
        return ScrollToStateInRecExecutionStatus;
    };
    let CompleteStatusforPopupsInRecExecutionStatus = element(by.xpath("//ag-grid-angular[1]/div[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[1]/div[@role='gridcell'and@col-id='recJobState']"));
    this.CompleteStatus_forPopups_InRecExecutionStatus = function () {
        return CompleteStatusforPopupsInRecExecutionStatus;
    };
    let ScrollToAvatarInRecExecutionPlan = element(by.css("button span[class='mat-button-wrapper'] div img[class='avatar']"));
    this.ScrollTo_Avatar_InRecExecutionPlan = function () {
        return ScrollToAvatarInRecExecutionPlan;
    };
    let ClickOnSignOut = element(by.xpath("//button[contains(text(),'Signout')]"));
    this.ClickOn_SignOut = function () {
        ClickOnSignOut.click();
    };

    let ClickOnRealFilterUnderRecGroupNameInRecExecutionStatus = element(by.xpath("//div[@class='ag-menu ag-ltr']/div[1]/div[@ref='tabHeader']/span[2]/span[1]"));
    this.ClickOnRealFilter_UnderRecGroupName_InRecExecutionStatus = function () {
        ClickOnRealFilterUnderRecGroupNameInRecExecutionStatus.click();
    };


}

module.exports = new Rec_PAsanity();