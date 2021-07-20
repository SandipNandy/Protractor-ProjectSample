//const { element } = require("protractor");

const { element } = require("protractor");

let Rec_PreparerSanity = function () {

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
    let ExpandRecon = element(by.xpath("//span[@class='mat-content']/mat-panel-title[contains(text(),'RECONCILIATION')]/ancestor::mat-expansion-panel-header[@aria-expanded]"));
    this.Expand_Recon = function () {
        return ExpandRecon;
    };
    let PresenceOfAtleastOneRow = element(by.css("[ref='eCenterContainer'] div[role='row'][ row-index='0']"));
    this.Presence_OfAtleastOneRow = function () {
        return PresenceOfAtleastOneRow;
    };
     //button[@ele-id='r-act-Comment']/span[.//i]
    let AddComments = element(by.xpath("//div[@col-id='Comment']/span[1]/div[@title='Add Comment']"));
    this.Add_Comments_ReconLevel = function () {
        return AddComments;
    };
    let AddCommentsLineLevel = element.all(by.xpath("//i[contains(@class,'icon-line-comment')]")).get(1);
    this.Add_CommentsLine_Level = function () {
        return AddCommentsLineLevel;
    };
    let TypeMessages = element(by.css("input[placeholder='Type your message']"));
    this.Type_Messages = function (TYM) {
        TypeMessages.sendKeys(TYM);
    };
    let PostMessage = element(by.xpath("//button[@mattooltip='Post Message']/span[//i]"));
    this.Post_Message = function () {
        PostMessage.click();
    };
    let ShowOnlyAttachements = element(by.xpath("//div[@class='h-100 o-y']//mat-icon[contains(text(),'check_box_outline_blank')]"));
    this.Show_Only_Attachements = function () {
        ShowOnlyAttachements.click();
    };
    let CloseReconLevelComment = element(by.xpath("//button[@aria-label='close-input-btn']/span[1]/mat-icon[@aria-label='close']"));
    this.Close_ReconLevel_Comment = function () {
        CloseReconLevelComment.click();
    };
    //let ClickAddCommentsInSummeryLevel = element(by.xpath("//ag-grid-angular[1]//div[@ref='eBodyViewport']/div[@ref='eRightContainer']/descendant::div[@role='row']/div[@role='gridcell'and@col-id='Comment']/span/div[@title='Add Comment']"));
    let ClickAddCommentsInSummeryLevel = element.all(by.xpath("//i[contains(@class,'icon-line-comment')]")).get(1);
    this.Click_AddComments_InSummeryLevel = function () {
        return ClickAddCommentsInSummeryLevel;
    };
    let clickAttentionCommentsAttachmentsInSummaryLevel = element(by.xpath("//span[contains(text(),'YES')]"));
    this.click_Attention_CommentsAttachments_InSummaryLevel = function () {
        clickAttentionCommentsAttachmentsInSummaryLevel.click();
    };
    let DownloadExcel = element(by.xpath("//app-table-actions/div[@fxlayout='row']/div[4]/button[@aria-label='act.tooltip']/span[1]/i[contains(@class,'-excel')]"));
    this.Download_Excel = function () {
        return DownloadExcel;
    };
    this.Download_Excel_SummaryTab = function () {
        return DownloadExcel;
    };
    this.Download_Excel_MRIGrids = function () {
        return DownloadExcel;
    };
    let AddCommentsMRI = element.all(by.xpath("//div[@title='Add Comment']")).get(0);
    this.Click_Comments_MRI = function () {
        return AddCommentsMRI;
    };

    let ClickRecGrids = element(by.xpath("//span[contains(text(),'Rec Grids')]"));
    this.Click_RecGrids = function () {
        return ClickRecGrids;
    };
    let ClickOnCommonProgram = element(by.xpath("//p[contains(text(),'PROGRAM')]"));
    this.ClickOn_CommonProgram = function () {
        ClickOnCommonProgram.click();
    };
    let MouseMoveRecGroupName = element(by.xpath("//span[contains(text(),'Rec Group Name')]"));
    this.MouseMove_RecGroupName = function () {
        return MouseMoveRecGroupName;
    };
    let ClickOnHiddenFilterInRecGroupName = element(by.xpath("//div[@col-id='recgroupname']/div[3]/span[1]/span[1]"));
    this.ClickOn_HiddenFlter_InRecGroupName = function () {
        return ClickOnHiddenFilterInRecGroupName;
    };
    let ClickRealFilterUnderHiddenFilter = element(by.xpath("//ag-grid-angular[1]/div[1]/div[6]/div[1]/div[1]/div[@ref='tabHeader']/span[2]/span[1]"));
    this.ClickRealFilter_UnderHiddenFilter_PreparerScreen = function () {
        return ClickRealFilterUnderHiddenFilter;
    };
    let UnSelectAll = element(by.xpath("//label[@ref='eSelectAllContainer']/span[contains(text(),'(Select All)')]"));
    this.UnSelect_All = function () {
        return UnSelectAll;
    };
    let InputGroupName = element(by.css("input[placeholder='Search...']"));
    this.Input_GroupName = function (IGN) {
        InputGroupName.sendKeys(IGN);
    };
    let SelectAll = element(by.xpath("//label[@ref='eSelectAllContainer']/span[contains(text(),'(Select All)')]"));
    this.Select_All = function () {
        return SelectAll;
    };
    let ClickOnApplyButtonAfterFilter = element(by.css("button[ref='eApplyButton']"));
    this.ClickOn_ApplyButton_AfterFilter = function () {
        ClickOnApplyButtonAfterFilter.click();
    };
    let clickOnCommonProgram = element(by.xpath("//p[contains(text(),'PROGRAM')]"));
    this.ClickOn_CommonProgram = function () {
        clickOnCommonProgram.click();
    };
    let ClickOnPopUpRecGroups = element(by.css("[ref='eCenterContainer'] div[row-index='0'] div[col-id='recgroupname']"));
    this.ClickOn_PopUpRecGroups = function () {
        return ClickOnPopUpRecGroups;
    };
    let DataLoadingInProgress = element(by.xpath("//div[contains(@class,'overlay-spinner-loading')]//div[contains(text(),' Data Loading in progress... ')]"));
    this.DataLoading_InProgess = function () {
        return DataLoadingInProgress;
    };
    let WaitForInvisibilityOfDataLoading = element(by.xpath("//div[contains(@class,'overlay-spinner-loading')]//div[contains(text(),' Data Loading in progress... ')]"));
    this.WaitFor_InvisibilityOf_DataLoading = function () {
        return WaitForInvisibilityOfDataLoading;
    };
    let ClickOnAutoCertified = element(by.xpath("//p[contains(text(),'Auto Certified')]"));
    this.ClickOn_AutoCertified = function () {
        return ClickOnAutoCertified;
    };
    let CheckAutoCertifyRow1 = element(by.css("[ref='eCenterContainer'] div[row-index='0']"));
    this.Click_AutoCertify_Row1 = function () {
        return CheckAutoCertifyRow1;
    };
    let ClickOnReconTab = element(by.xpath("//a[@ele-id='lr-Recon']/span[contains(text(),'Recon')]"));
    this.ClickOn_ReconTab = function () {
        ClickOnReconTab.click();
    };
    let ClickOnRiskOpportunity = element(by.xpath("//a[@ele-id='lr-Risk & Opportunities']/span[contains(text(),'Risk & Opportunities')]"));
    this.ClickOn_Risk_Opportunity = function () {
        ClickOnRiskOpportunity.click();
    };
    let ClickOnActionReasonCode = element(by.css("p[title='Action | Reason Code']"));
    this.ClickOn_Action_ReasonCode = function () {
        return ClickOnActionReasonCode;
    };
    let SystemCertified = element(by.css("p[title='CERTIFY | System Certified']"));
    this.System_Certified = function () {
        return SystemCertified;
    };
    let ArrowBack = element(by.xpath("//mat-icon[contains(text(),'arrow_back')]"));
    this.Arrow_Back = function () {
        return ArrowBack;
    };
    let clickPending = element(by.xpath("//p[contains(text(),' Pending')]"));
    this.Click_Pending = function () {
        return clickPending;
    };
    let ClickSaveSubmit = element(by.xpath("//button/span[contains(text(),'Save & Submit')]"));
    this.Click_SaveSubmit = function () {
        return ClickSaveSubmit;
    };
    let clickReasonName = element(by.css("mat-select[name='reasonName']"));
    this.click_ReasonName = function () {
        return clickReasonName;
    };
    let SelectReason = element(by.xpath("//html[1]/body[1]/div[1]/div[4]/div[1]/div[1]/div[1]/mat-option[1]/span[1]"));
    this.Select_Reason = function () {
        return SelectReason;
    };
    let SubmitNotes = element(by.css("textarea[aria-label='submitNotes']"));
    this.Submit_Notes = function (SN) {
        SubmitNotes.sendKeys(SN);//'Automation Testing'
    };
    let clickSubmit = element(by.css("button[aria-label='SUBMIT']"));
    this.click_Submit = function () {
        return clickSubmit;
    };
    let GetNotification = element(by.css("notifier-container div[type='notificationData.type']"));
    this.Get_Notification = function () {
        return GetNotification;
    };
    let ClickAvatar = element(by.css("button span[class='mat-button-wrapper'] div img[class='avatar']"));
    this.Click_Avatar = function () {
        return ClickAvatar;
    };
    let SignOut = element(by.xpath("//button[contains(text(),'Signout')]"));
    this.Sign_Out = function () {
        return SignOut;
    };

    let PreparerStatus = element(by.css("p[title='Status']"));
    this.Preparer_Status = function () {
        return PreparerStatus;
    };
    let AutoCertifyStatus=element(by.xpath("//p[contains(text(),'STATUS')]/following-sibling::p"));
    this.AutoCertify_Status=function(){
       return AutoCertifyStatus;
    };
    let PreparerCheckAcquire = element.all(by.xpath("//p[contains(@class,'custom-text-wrap status-summary')]")).get(0);
    this.Preparer_Check_Acquire = function () {
        return PreparerCheckAcquire;
    };
    let PreparerParticipantAndAcquiedStatus = element(by.xpath("//app-status-summary/div[@class='h-100']/div[1]/descendant::mat-list-item[3]/div[1]/descendant::div[3]/div[2]"));
    this.Preparer_Participant_And_AcquiedStatus = function () {
        return PreparerParticipantAndAcquiedStatus;
    };
    let CloseAcquireStatus = element.all(by.css("mat-icon[aria-label='close']")).get(1);
    this.Close_Acquire_Status = function () {
        CloseAcquireStatus.click();
    };
    let ScrollToShowAll = element(by.xpath("//div[@class='pointer'][contains(text(),'SHOW ALL')]"));
    this.ShowTo_ShowAll = function () {
        return ScrollToShowAll;
    };
    let WaitTillInvisibleOfCirle = element(by.css("mat-spinner[role='progressbar']"));
    this.Wait_Till_InvisibleOf_Cirle = function () {
        return WaitTillInvisibleOfCirle;
    };
    let ClickOnShowAllButton = element(by.xpath("//button/span[1]/mat-icon[contains(text(),' check_box_outline_blank')]"));
    this.ClickOn_ShowAll_Button = function () {
        return ClickOnShowAllButton;
    };
    let ClickFilter = element(by.xpath("//app-table-actions/div[1]/div[2]/button[@aria-label='act.tooltip']/span[.//i]"));
    this.Click_Filter = function () {
        return ClickFilter;
    };
    let ClickAddFilter = element(by.xpath("//mat-dialog-container/app-rec-grid-hmi-filter-dialog/form/descendant::button[3]/span[contains(text(),'+ Add Filter')]"));
    this.Click_Add_Filter = function () {
        return ClickAddFilter;
    };
    let ClickOnColumnInsideFilter = element(by.xpath("//label/mat-label[contains(text(),'Column')]"));
    this.Click_On_ColumnInsideFilter = function () {
        return ClickOnColumnInsideFilter;
    };
    let SelectCategoryColumnFromFilter = element(by.xpath("//div[@class='cdk-overlay-pane']//span[contains(text(),'- Category')]"));
    this.Select_CategoryColumn_FromFilter = function () {
        return SelectCategoryColumnFromFilter;
    };
    let ClickOperatorInsideFilter = element(by.xpath("//label/mat-label[contains(text(),'Operator')]"));
    this.Click_Operator_InsideFilter = function () {
        return ClickOperatorInsideFilter;
    };
    let SelectOperatorsInsideFilter = element(by.xpath("//div[@class='cdk-overlay-pane']//span[contains(text(),' EQUAL_IGNORE_CASE ')]"));
    this.Select_Operators_InsideFilter = function () {
        return SelectOperatorsInsideFilter;
    };
    let ClickOnApplyFilter = element(by.xpath("//span[contains(text(),'APPLY')]"));
    this.ClickOn_Apply_Filter = function () {
        return ClickOnApplyFilter;
    };
    let PresentOfSmallWindow = element(by.css("div[class='cdk-overlay-pane'] app-input-dialog"));
    this.PresentOf_SmallWindow = function () {
        return PresentOfSmallWindow;
    };
    let inputSearch = element(by.css("input[type=search]"));
    this.input_Search = function (IS) {
        inputSearch.sendKeys(IS);
    };
    let ApplyToAllItem = element(by.xpath("//div[contains(text(),'Apply to All items')]/preceding-sibling::button[@type='button']/span[1]"));
    this.Apply_To_All_Item = function () {
        ApplyToAllItem.click();
    };
    let ClickSubmit = element(by.css("[aria-label='SUBMIT']"));
    this.Click_Submit = function () {
        ClickSubmit.click();
    };
    let ClickManualGrids = element(by.xpath("//span[contains(text(),'Manual Grids')]"));
    this.Click_ManualGrids = function () {
        return ClickManualGrids;
    };
    let AddRow = element(by.xpath("//button/span[contains(text(),' Add Row ')]"));
    this.Click_AddRow = function () {
        return AddRow;
    };

    let CCode = element(by.xpath("//mat-label[contains(text(),'COMPANY CODE')]"));
    this.Click_Ccode = function () {
        return CCode;
    };
    let CompanyCode = element(by.xpath("//mat-option[@role='option']"));
    this.Click_Companycode = function () {
        return CompanyCode;
    };
    let GLAcc = element(by.xpath("//mat-label[contains(text(),'GL ACCOUNT')]"));
    this.Click_GLAcc = function () {
        return GLAcc;
    };
    let GLAccount = element(by.xpath("//mat-option[@role='option']"));
    this.Click_GLAccount = function () {
        return GLAccount;
    };
    let TransDate = element(by.xpath("//mat-label[contains(text(),'TRANSACTION DATE')]"));
    this.Transaction_Date = function () {
        return TransDate;

    };
    let TransdateInput = element(by.xpath("//mat-label[contains(text(),'TRANSACTION DATE')]/preceding::input[@type='date']"));
    this.TransationDate_Input = function (TID) {
        TransdateInput.sendKeys(TID);
    };
    let Currency = element(by.xpath("//mat-label[contains(text(),'CURRENCY')]"));
    this.click_currency = function () {
        return Currency;
    };
    let CurrencyInput = element(by.xpath("//mat-label[contains(text(),'CURRENCY')]/ancestor::label[1]/ancestor::span[1]/parent::div/input[@type='search']"));
    this.Currency_Input = function (CI) {
        CurrencyInput.sendKeys(CI);
    };
    let NetAccountedamnt = element(by.xpath("//mat-label[contains(text(),'NET ACCOUNTED AMOUNT')]"));
    this.Clik_NetAcntedAmnt = function () {
        return NetAccountedamnt;
    };
    let NetInput = element.all(by.xpath("//mat-label[contains(text(),'NET ACCOUNTED AMOUNT')]/preceding::input[@type='number']")).get(2);
    this.Net_Input = function (NI) {
        NetInput.sendKeys(NI);
    };
    let ExplanationCate = element(by.xpath("//mat-label[contains(text(),'EXPLANATION CATEGORY')]"));
    this.click_ExplanationCategory = function () {
        return ExplanationCate;
    };
    let ExplanationInput = element(by.xpath("//mat-label[contains(text(),'EXPLANATION CATEGORY')]/ancestor::label[1]/ancestor::span[1]/parent::div/input[@type='search']"));
    this.Explanation_Input = function (EI) {
        ExplanationInput.sendKeys(EI);
    };
    let ExplanationDesc = element(by.xpath("//mat-label[contains(text(),'EXPLANATION DESCRIPTION')]"));
    this.click_ExplanationDescription = function () {
        return ExplanationDesc;

    };
    let ExplanInput = element(by.xpath("//mat-label[contains(text(),'EXPLANATION DESCRIPTION')]/ancestor::label[1]/ancestor::span[1]/parent::div/input[@type='search']"));
    this.ExplanationDesc_Input = function (DI) {
        ExplanInput.sendKeys(DI);
    };
    let LineDesc = element(by.xpath("//mat-label[contains(text(),'LINE DESCRIPTION')]"));
    this.click_LineDescription = function () {
        return LineDesc;

    };
    let LineInput = element(by.xpath("//mat-label[contains(text(),'LINE DESCRIPTION')]/ancestor::label[1]/ancestor::span[1]/parent::div/input[@type='search']"));
    this.LineDesc_Input = function (LI) {
        LineInput.sendKeys(LI);
    };
    let Period = element(by.xpath("//mat-label[contains(text(),'PERIOD')]"));
    this.click_Period = function () {
        return Period;
    };

    let PeriodSelect = element(by.xpath("//mat-option/span"));
    this.Click_PeriodDrop = function () {
        return PeriodSelect;
    };
    let Saving = element(by.xpath("//span[contains(text(),'SAVE')]"));
    this.Click_Saving = function () {
        return Saving;
    };


    let CheckUnexplainedRowAvailability = element.all(by.xpath("//div[contains(text(),' of ')]")).get(0);
    this.Check_Unexplained_Row_Availability = function () {
        return CheckUnexplainedRowAvailability;
    };
    let ClickLeftMoreOptions=element.all(by.xpath("//span[contains(text(),'more options')]")).get(0);
    this.Click_Left_MoreOptions=function(){
        return ClickLeftMoreOptions;
    };
    let ClickRightMoreOptions=element.all(by.xpath("//span[contains(text(),'more options')]")).get(1);
    this.Click_Right_MoreOptions=function(){
        return ClickRightMoreOptions;
    };
    let ShowingAllRows=element(by.xpath("//div[contains(text(),'Showing All Rows (')]"));
    this.Showing_All_Rows=function(){
       return ShowingAllRows;
    };
    let CheckUnexplainedRowAvailability1 = element(by.xpath("//div[@class='cdk-overlay-pane']//div[contains(text(),'SHOW ALL (')]"));
    this.Check_Unexplained_Row_Availability1 = function () {
        return CheckUnexplainedRowAvailability1;
    };
    this.check_RowIn_RecGrids=function(){
        return CheckUnexplainedRowAvailability1;
    };
    this.Availability_Of_SummaryComments_Attachment=function(){
        return CheckUnexplainedRowAvailability1;

    };
    this.AvailablityOf_MRI_For_CommentAttachment=function(){
        return CheckUnexplainedRowAvailability1;
    };

    this.AvailablityOf_Row_Unmatched=function(){
        return CheckUnexplainedRowAvailability1;
    };
    this.AvailbilityUnMatchedRows=function(){
        return CheckUnexplainedRowAvailability1;
    };
    let SelectMoreOptionsDropDown=element(by.xpath("//div[contains(text(),'SHOW ALL (')]/preceding-sibling::button[1]"));
    this.Select_More_Options_DropDown=function(){
       return SelectMoreOptionsDropDown;
    };
    let ClickLHSCheckBox=element.all(by.xpath("//div[contains(text(),'SHOW ALL (')]/preceding-sibling::button[contains(@aria-label,'check_box')]")).get(0);
    this.Click_LHS_CheckBox=function(){
        return ClickLHSCheckBox;
    };
    let ClickRHSCheckBox=element.all(by.xpath("//div[contains(text(),'SHOW ALL (')]/preceding-sibling::button[contains(@aria-label,'check_box')]")).get(1);
    this.Click_RHS_CheckBox=function(){
        return ClickRHSCheckBox;
    };
    let RowSelectionLHS=element.all(by.xpath("//input[@type='checkbox'and @ref='eInput']/following-sibling::div/span")).get(0);
    //let RowSelectionLHS=element.all(by.xpath("//div[contains(text(),'Debit Lines')]/following::mat-paginator//following::ag-grid-angular//input[@type='checkbox'and @ref='eInput']/following-sibling::div/span")).get(0);
    this.Row_Selection_LHS=function(){
        return RowSelectionLHS;
    };
    let RowSelectionRHS=element(by.xpath("//div[contains(text(),'Credit lines')or contains(text(),'GL Credits')]/following::ag-grid-angular//input[@type='checkbox'and @ref='eInput']/following-sibling::div/span[contains(@class,'-checkbox-unchecked')]"));
    //let RowSelectionRHS=element.all(by.xpath("//input[@type='checkbox'and @ref='eInput']/following-sibling::div/span")).get(8);
    this.Row_Selection_RHS=function(){
        return RowSelectionRHS;
    };
    let WaitForVarianceTab=element.all(by.xpath("//mat-toolbar[@fxlayout='row']")).get(0);
    this.Wait_For_Variance_Tab=function(){
        return WaitForVarianceTab;
    };

    let VarianceAmount=element(by.xpath("//div[contains(text(),'Variance :')]/b"));
    this.Variance_Amount=function(){
        return VarianceAmount;
    };
    let ClickFullyMatch=element(by.xpath("//button/span[contains(text(),' Fully Match ')]"));
    this.Click_Fully_Match=function(){
     return ClickFullyMatch;
    };
    let ClickMatchWithVariance=element(by.xpath("//span[contains(text(),'Match with Variance')]"));
    this.Click_Match_With_Variance=function(){
       return ClickMatchWithVariance;
    };
    let ClickYESWithVariance=element(by.xpath("//span[contains(text(),'YES')]"));
    this.Click_YESWith_Variance=function(){
        return ClickYESWithVariance;
     };

    let ReRunRules = element(by.xpath("//span[contains(text(),'Re-Run Rules')]"));
    this.Re_Run_Rules = function () {
        return ReRunRules;
    };
    let ReRunNow = element(by.xpath("//span[contains(text(),'Re-run Now')]"));
    this.Re_Run_Now = function () {
        return ReRunNow;
    };
    let RerunNotification = element(by.xpath("//span/i[contains(text(),'In Progress')]"));
    this.Rerun_Notification = function () {
        return RerunNotification;
    };
    let ReRunCompletionNotification = element(by.xpath("//notifier-container/div[@type='notificationData.type'][contains(text(),'Re-Run Completed for')]"));
    this.ReRun_Completion_Notification = function () {
        return ReRunCompletionNotification;
    };

    let GetAllTheDropDownValue = element.all(by.xpath("//div[@class='cdk-overlay-pane']/div[1]/div[1]/mat-option"));
    this.GetAll_TheDropDown_Value = function () {
        return GetAllTheDropDownValue;
    };
    let DropDownColumnInGlobalFilter = element.all(by.xpath("//div[@class='cdk-overlay-pane']/div[1]/div[1]/mat-option/span"));
    this.DropDown_Column_In_GlobalFilter = function () {
        return DropDownColumnInGlobalFilter;
    };
    let ClickOnGlobalFilter = element(by.xpath("//div[contains(text(),'GLOBAL FILTERS')]"));
    this.ClickOn_Global_Filter = function () {
        return ClickOnGlobalFilter;
    };
    let ClickOnDiscard = element(by.xpath("//button/span[contains(text(),'DISCARD')]"));
    this.ClickOn_Discard = function () {
        return ClickOnDiscard;
    };
    let FindVarianceInSummaryTab = element.all(by.xpath("//div[@class='o-y']/a/div[2]/ul/li[3]/div[2]")).get(0);
    this.Find_Variance_InSummaryTab = function () {
        return FindVarianceInSummaryTab;
    };
    let ClickOnSummaryValidation = element(by.xpath("//span[contains(text(),'Summary & Validation')]"));
    this.ClickOn_Summary_Validation = function () {
       return ClickOnSummaryValidation;
    };
    let CheckTrialBalanceInSummary = element(by.xpath("//div[@class='o-y']/a/div[2]/ul/li[1]/div[2]"));
    this.Check_Trial_BalanceInSummary = function () {
        return CheckTrialBalanceInSummary;
    };
    let GetAllDropDownValueInGlobalFilterRecGrids = element.all(by.xpath("//div[@class='cdk-overlay-pane']/div/div/mat-option/span"));
    this.GetAll_DropDown_ValueIn_GlobalFilter_RecGrids = function () {
        return GetAllDropDownValueInGlobalFilterRecGrids;

    };
    let ScrollToClosingBalanceInRecGrids = element(by.xpath("//span[@role='columnheader' and contains(text(),'Closing Balance')]"));
    this.ScrollTo_ClosingBalance_InRecGrids = function () {
        return ScrollToClosingBalanceInRecGrids
    };
    let VarifyClosingBalenceInRecGrids = element(by.xpath("//div[@role='gridcell'and@col-id='closingbalance']"));
    this.Varify_Closing_Balence_InRecGrids = function () {
        return VarifyClosingBalenceInRecGrids;
    };
    let ClickTrailBalanceInRecGrids=element(by.xpath("//span[contains(text(),'TRIAL BALANCE') or contains(text(),'Trial Balance') or contains(text(),'TB')]"));
    this.Click_TrailBalance_InRecGrids=function(){
       return ClickTrailBalanceInRecGrids;
    };
    let GoToUnmatched=element(by.xpath("//span[contains(text(),'Unmatched')]"));
    this.Go_To_Unmatched=function(){
         return GoToUnmatched;
    };
    let ExcelDownLoadValidation=element(by.xpath("//div[@type='notificationData.type'][contains(text(),'Generating Excel')]"));
    this.Excel_DownLoad_Validation=function(){
     return ExcelDownLoadValidation;
    };
    let SelectAllRowInRecon=element(by.xpath("//div[@role='row']/div[@col-id='checkbox']/descendant::div[@ref='eWrapper']/input[@ref='eInput']/following-sibling::div/span[1]"));
    this.Select_AllRow_InRecon=function(){
        return SelectAllRowInRecon;
    };
    let SelectSummaryButtonforCommentsAttachement=element.all(by.xpath("//div[@ref='cbSelectAll']/div/div/span")).get(0);
    this.SelectSummary_Buttonfor_CommentsAttachement=function(){
        return SelectSummaryButtonforCommentsAttachement;
    };

    let ClickOnClearForCommentsAttachement=element(by.xpath("//span[contains(text(),'Clear')]"));
    this.ClickOnClear_For_CommentsAttachement=function(){
        ClickOnClearForCommentsAttachement.click();
    };

    let ClickMoreOptions=element(by.xpath("//span[contains(text(),'more options')]"));
    this.Click_MoreOptions=function(){
        return ClickMoreOptions;
    };
    let ClickBussinessAccount=element(by.xpath("//p[contains(@title,'Business Account') or contains(text(),'BUSINESS ACCOUNT')]"));
    this.Click_Bussiness_Account=function(){
       return ClickBussinessAccount;
    };

}
module.exports = new Rec_PreparerSanity();