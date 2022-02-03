/**
 * 07-03-2021 IMPLEMENTATIONS - 1.Fresh Execution(PA), 2. Comment / Atatchement(Recon level) 3. Comment / Atatchement(Summary level) 4. Comment / Atatchement(line level), 5. Download of excel(Recon Tab)
 * 6. Download of excel(Rec Grids), 7. Preparer to Review, 8. Review to Approve , 9. Approve as reject, 10. Appove - Completed
 * 11-03-21 -updated in rec execution status
 * pending 3 functionalities added- rerun, recon amend, acquire and summary
 * summary level has been added under rerun
 * 10-05-21-In Preparer Screen -'Manual Fully match', 'Manual Match with Variance', 'Download of Excel (MRI Grids)','Comment /Attachment (MRI level)','Download of Excel (Summary Tab)','MRI Line Addition with MRI Schedule update (as per template)'
 * has been implemented
 * Over All-36 Test Scenarios Covered
 * New SCREEN-'Proof of Approval' has been added in Work Allocation
 * Last Update-25-05-2021,27-05-21, 31-05-21,02-06-21
 */



//--------------------------------------------------Program Admin Starts--------------------------------------------------------
var path = require('path');
var XLSX = require('xlsx');
var workbook = XLSX.readFile('../ReconCore/Automation_PassFail_StampingAvnet.xlsx');
var workbook1 = XLSX.readFile('../ReconCore/R2R Data Template for Rec Planning_Avnet.xlsx');

var WorksheetBDD = workbook1.Sheets['BDD_Framework'];
var WorksheetControlstatement = workbook1.Sheets['Control_Statements'];
//var WorksheetLogin = workbook.Sheets['Login'];
//var WorksheetProgramCreation=workbook.Sheets['Program_Creation'];
var WorksheetReconExecution = workbook1.Sheets['Recon Workflow, Allocation, Exe'];
var WorksheetGLaccountREC = workbook1.Sheets['GL_Accounts_ForREC'];
var WorksheetCompanyCode = workbook1.Sheets['CompanyCode for Rec Planning'];
var WorksheetFieldNames = workbook1.Sheets['Field_Names'];
var PFStamping = workbook.Sheets['Stamping Pass-Fail'];

var columnSelection = require('./ColmnSelection.js');
var reconCreationPOM = require('./PA_RecCreation_MainPom.js');
var reconCreationFunction = require('./PA_RecCreation_MainFun.js');


var ReconFRow = WorksheetControlstatement['A12'].v;//Recon Execution 1ST Row.
var ReconLRow = WorksheetControlstatement['B12'].v;//Recon Execution Last Row.

var glAccOrFQANFColumn = WorksheetControlstatement['C12'].v;//This is for 1st GL ACCOUNT COLUMN SELECTION.
var glAccOrFQANLColumn = WorksheetControlstatement['D12'].v;//This is for Last GL ACCOUNT COLUMN SELECTION.


var CompanyCodeOrEntityFcolumn = WorksheetControlstatement['E12'].v;
var CompanyCodeOrEntityLcolumn = WorksheetControlstatement['F12'].v;
//var i,j;
var EC = protractor.ExpectedConditions;

function filteringPrimary2Steps() {
    //click filter under hidden filter.
    var RealFilter = reconCreationPOM.real_FilterUnderHiddenFilter();
    browser.executeScript("arguments[0].click()", RealFilter);
    //Unselect all the before search
    var UncheckAll1 = reconCreationPOM.uncheck_SelectAll();
    browser.executeScript("arguments[0].click()", UncheckAll1);

};

function click_SignIn() {
    browser.sleep(2000);
    var avtar = element(by.css("button span[class='mat-button-wrapper'] div img[class='avatar']"));
    browser.executeScript("arguments[0].scrollIntoView()", avtar).then(() => {
        avtar.click();
    });
    browser.sleep(1000);
    //change the profile role to business account admin 
    element(by.css("div[class='cdk-overlay-pane'] div[role='menu']")).element(by.css("div[class='mat-menu-content'] div mat-form-field")).click();
    browser.sleep(1000);
};

function protractorsynchronization() {
    //Without Passing a value to read the current state without changing xit
    browser.waitForAngularEnabled(false);
    //xit is used to resolve $http and $timeout nd access the Standard Webdriver Api Successfully
    browser.ignoreSynchronization = true;
};

function changing10To200() {
    var WaitForRecTypes = reconCreationPOM.wait_ForRecTypesWorkFlow();
    browser.wait(EC.presenceOf(WaitForRecTypes), 90000).then(() => {
        var Default10 = reconCreationPOM.click_Defaultrow10();
        browser.executeScript("arguments[0].click()", Default10);
        reconCreationFunction.select_RowNumber('200');

    });
    browser.sleep(10000);
};

function RecGroupSelectionWorkAllocation(ii) {
    var mousemove7 = reconCreationPOM.mousemove_RecGroups();
    browser.executeScript("arguments[0].scrollIntoView()", mousemove7).then(() => {

        reconCreationPOM.click_hiddenfilter_RecGroups_WorkAllocation();
    });
    //Unselect all in search    
    var WARGF = reconCreationFunction.WorkAllocation_RecGroupFilter();
    browser.executeScript("arguments[0].click()", WARGF);
    var UncheckAll3 = reconCreationPOM.uncheck_SelectAll();
    browser.executeScript("arguments[0].click()", UncheckAll3);
    var recgroupsSearch = reconCreationPOM.click_SearchFilter()
    //Recon Group Name
    recgroupsSearch.sendKeys(WorksheetReconExecution['B' + ii].v);
    browser.sleep(2000);
    let mousemove8 = reconCreationFunction.Click_SearchedItems(WorksheetReconExecution['B' + ii].v)
    mousemove8.isPresent().then((text14) => {
        if (text14 == true) {
            browser.executeScript("arguments[0].click();", mousemove8);

            browser.wait(EC.visibilityOf(recgroupsSearch), 10000).then(function () {
                recgroupsSearch.clear();
            });
        }
    });

    browser.sleep(2000);
    //Finally click on apply filter.
    reconCreationPOM.click_ApplyFilter();
    reconCreationPOM.Common_Program();
    //Click on the selected rec groups for a particular rec types
    browser.sleep(3000);

    var PRGWA = reconCreationPOM.PopUp_RecGroupsinWorkAllocation();
    PRGWA.isPresent().then((text15) => {
        //console.log('text15 :' + text15);
        if (text15 == true) {
            var CPRGWA = reconCreationFunction.clickPopUp_RecGroupsinWorkAllocation();
            browser.executeScript("arguments[0].click()", CPRGWA);

        }
        else {
            var NumberOfRecGroups = element(by.css("div[fxlayoutalign='space-between center'] div p[class='m-0 font-12'] span"));
            NumberOfRecGroups.getText().then((Number) => {
                var words = Number.split(' ');
                console.log(words[3]);
                var x = parseInt(words[3]);
                var y = x / 200;
                console.log('Y:-' + y);
                var z = Math.floor(y);
                console.log('Z:-' + z);
                for (let ii = 1; ii <= z; ii++) {
                    var nextbutton = element(by.xpath("//button[@aria-label='Next page']/span[1]"));
                    browser.executeScript("arguments[0].click();", nextbutton);
                    browser.sleep(18000);
                    if (ii == z) {
                        element(by.xpath("//body/app-root[1]/main[1]/div[1]/div[1]/div[1]/div[2]/mat-drawer-container[1]/mat-drawer-content[1]/app-dashboard[1]/div[1]/mat-drawer-container[1]/mat-drawer-content[1]/div[1]/app-program-admin-dashboard[1]/div[1]/app-admin-active-program[1]/div[1]/div[2]/app-recon-program-config[1]/div[1]/div[1]/app-ops-admin-work-allocation-landing[1]/div[1]/div[3]/div[2]/div[1]/ag-grid-angular[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/span[1]")).click();
                    }
                }
            });

        }

    });
};

function RecExecutionPlanAssignPeriod(AssignPeriod) {
    var PopupGroupInRecExecutionPlan = reconCreationPOM.Select_ThePopupGroupInRecExecutionPlan();
    browser.executeScript("arguments[0].click()", PopupGroupInRecExecutionPlan);

    var WaitForAssignPeriod = reconCreationPOM.WaitForAssign_PeriodTab_InRecExecutionPlan();
    browser.wait(EC.presenceOf(WaitForAssignPeriod), 30000);
    //browser.sleep(6000);

    reconCreationPOM.Click_AssignPeriod();
    browser.sleep(1000);
    //Click on Assign Period

    reconCreationPOM.Assign_PeriodSearchBar(AssignPeriod);//Aug-20/Aug-20,Aug-20/Sep-20, Oct-20/Oct-20
    //browser.sleep(1000);

    reconCreationPOM.Select_PopUpAssignPeriod();
    //browser.sleep(1000);

    reconCreationPOM.Click_AssignRecExecutionPlan();
    reconCreationPOM.Common_Program();

    browser.sleep(4000);
};

function FindGroupNameInManualExecution(jj) {
    var scrollView = reconCreationPOM.mouseMove_GroupOnManualExecution();
    browser.executeScript("arguments[0].scrollIntoView();", scrollView).then(() => {
        var clickhiddenfilter = reconCreationPOM.click_HiddenFilterOfGroupIn_ManualExecution();
        browser.executeScript("arguments[0].click();", clickhiddenfilter);
    });
    filteringPrimary2Steps();

    var SearchGroupName = reconCreationPOM.click_SearchFilter();
    SearchGroupName.sendKeys(WorksheetReconExecution['B' + jj].v);
    browser.sleep(2000);
    var mousemove30 = reconCreationFunction.Click_SearchedReconTypes(WorksheetReconExecution['B' + jj].v, jj)
    mousemove30.isPresent().then((text25) => {
        if (text25 == true) {
            browser.executeScript("arguments[0].click()", mousemove30);
            browser.sleep(2000);
        }
    });
    SearchGroupName.clear();
    browser.sleep(2000);
    reconCreationPOM.click_ApplyFilter();
    reconCreationPOM.Common_Program();
};

function FilterRecTypesInWorkFlow(FRTIWF) {
    browser.sleep(4000);
    //Uncheck at first the selected Rec Types
    var USR = reconCreationFunction.uncheck_SelectedRec();
    browser.wait(EC.visibilityOf(USR), 20000).then(function () {
        //USR.click();
        browser.executeScript("arguments[0].click()", USR);
    });
    browser.sleep(7000);
    var mousemove5 = reconCreationPOM.mousemove_recTypes();
    browser.executeScript("arguments[0].scrollIntoView()", mousemove5).then(() => {
        //browser.actions().mouseMove(mousemove5).perform().then(function () {
        var CHRT = reconCreationFunction.clickhiddenfilter_RecTypes();
        browser.executeScript("arguments[0].click();", CHRT);
    });
    //Unselect all the before search
    filteringPrimary2Steps();
    var RecTypeSearch = reconCreationPOM.click_SearchFilter();
    RecTypeSearch.sendKeys(WorksheetReconExecution['C' + FRTIWF].v);
    browser.sleep(2000);
    var mousemove6 = reconCreationFunction.Click_SearchedReconTypes(WorksheetReconExecution['C' + FRTIWF].v, FRTIWF);
    mousemove6.isPresent().then((text5) => {
        if (text5 == true) {
            browser.wait(EC.visibilityOf(mousemove6), 20000).then(function () {

                browser.executeScript("arguments[0].click()", mousemove6);
                //browser.actions().mouseMove(mousemove6).click().perform();
            });
        }
    });
    //browser.sleep(2000);
    browser.wait(EC.visibilityOf(RecTypeSearch), 20000).then(function () {

        RecTypeSearch.clear();
    });
    //browser.sleep(2000);

    reconCreationPOM.Common_Program();
    browser.sleep(1000);
    var CPRWF = reconCreationPOM.click_PopupRectypesInworkflow();
    CPRWF.isPresent().then((text6) => {
        if (text6 == true) {
            browser.wait(EC.visibilityOf(CPRWF), 20000).then(function () {
                CPRWF.click();
            });
        }
    });
    browser.sleep(2000);

};

function FilterRecTypesInWorkAllocation(FRTWA) {
    browser.sleep(4000);
    var mousemove5 = reconCreationPOM.mousemove_recTypesWorkAllocation();
    browser.executeScript("arguments[0].scrollIntoView()", mousemove5).then(() => {

        var CHRTWA = reconCreationFunction.clickhiddenfilter_RecTypes_WorkAllocation();
        browser.executeScript("arguments[0].click()", CHRTWA);
    });

    //Unselect all the before search
    filteringPrimary2Steps();
    var rectypesSearch = reconCreationPOM.click_SearchFilter();
    //Search for Recon Types
    rectypesSearch.sendKeys(WorksheetReconExecution['C' + FRTWA].v);
    browser.sleep(2000);
    let mousemove6 = reconCreationFunction.Click_SearchedReconTypes(WorksheetReconExecution['C' + FRTWA].v, FRTWA);
    mousemove6.isPresent().then((text12) => {
        if (text12 == true) {
            browser.executeScript("arguments[0].click()", mousemove6);

        }
    });

    browser.wait(EC.visibilityOf(rectypesSearch), 50000).then(function () {
        rectypesSearch.clear();
    });
    reconCreationPOM.Common_Program();
    browser.sleep(1000);
    var checkingRecTypesWorkAllocation = reconCreationPOM.Check_RecTypes_WorkAllocation();
    checkingRecTypesWorkAllocation.isPresent().then((text13) => {
        if (text13 == true) {
            var PRTWA = reconCreationPOM.popup_RecTypeWorkAllocation();
            browser.wait(EC.visibilityOf(PRTWA), 20000).then(function () {
                PRTWA.click();
            });
        }
    });
    browser.sleep(1000);
};

function CommentsAndAttachmentsP(C) {
    var fileToUpload = './Micky.jpg',
        //C:/Users/PraveenKumar/Desktop/AutomationActionLogScripts/SanityActionPref/Micky.jpg
        absolutepath = path.resolve(__dirname, fileToUpload);
    $('input[type="file"]').sendKeys(absolutepath);
    RecPreparerPOM.Type_Messages(C);
    browser.sleep(1000);
    RecPreparerPOM.Post_Message();
    RecPreparerPOM.Show_Only_Attachements();
    browser.sleep(2000);
    RecPreparerPOM.Close_ReconLevel_Comment();
};

function StepsDuringRecGroupSelection() {
    //Clicking on  hidden filter  on recon group name.
    recrevsanitypomR.Click_HiddenFilter_ForRecGroupName();

    //Click filter under hidden filter.
    recrevsanitypomR.select_hiddenfil();

    //Unselect all the before search
    recrevsanitypomR.unselect_search();
    //Searching for the particular rec group name
    recrevsanitypomR.search_recgrp(WorksheetPrepareReviewApprove['A' + i].v);

    //Select all after search
    recrevsanitypomR.select_all();
    browser.sleep(1000);

    //Applying filter
    recrevsanitypomR.apply_filter();

    recrevsanitypomR.Click_CommonProgram();
    browser.sleep(1000);

};

function CommentsAndAttachmentsR(C) {
    var fileToUpload = './Micky.jpg',
        absolutepath = path.resolve(__dirname, fileToUpload);
    $('input[type="file"]').sendKeys(absolutepath);
    recrevsanitypomR.Type_Messages(C);
    browser.sleep(1000);
    recrevsanitypomR.Post_Message();
    recrevsanitypomR.Show_Only_Attachements();
    browser.sleep(2000);
    recrevsanitypomR.Close_ReconLevel_Comment();
};
function CommentsAndAttachmentsA(C) {
    var fileToUpload = './Micky.jpg',
        
        absolutepath = path.resolve(__dirname, fileToUpload);
    $('input[type="file"]').sendKeys(absolutepath);
    recappsanitypomA.Type_Messages(C);
    browser.sleep(1000);
    recappsanitypomA.Post_Message();
    recappsanitypomA.Show_Only_Attachements();
    browser.sleep(2000);
    recappsanitypomA.Close_ReconLevel_Comment();
};
function F3StepsOfGlobalFilter() {
    var CF = RecPreparerPOM.Click_Filter();
    browser.executeScript("arguments[0].click()", CF);
    browser.sleep(2000);
    var CAF = RecPreparerPOM.Click_Add_Filter();
    browser.executeScript("arguments[0].click()", CAF);
    browser.sleep(2000);
    var CCIF = RecPreparerPOM.Click_On_ColumnInsideFilter();
    browser.executeScript("arguments[0].click()", CCIF);
    browser.sleep(2000);
};
//-----------------------------------Program Admin Finished------------------------------------------
//-----------------------------------Preparer Screen-------------------------------------------------
var workbook2 = XLSX.readFile('../SingleTouchAutomationAvnet/ReconCore/PreparerReconAvnet.xlsx');
var WorksheetControlST = workbook2.Sheets['ControlStatements'];
var WorksheetPrepareReviewApprove = workbook.Sheets['MainData_Prepare,Review,Approve'];
var FrowReconPreparer = WorksheetControlST['A14'].v;
var LrowReconPreparer = WorksheetControlST['B14'].v;
//var EC = protractor.ExpectedConditions;
var RecPreparerPOM = require('./PreparerPOM.js');
var RecPreparerFun = require('./PreparerFun.js');


//-----------------------------------Preparer Screen-------------------------------------------------
//-----------------------------------Reviewer Screen-------------------------------------------------
var workbook3 = XLSX.readFile('../SingleTouchAutomationAvnet/ReconCore/PreparerReconAvnet.xlsx');
//var workbook = XLSX.readFile('C:/Users/SandipNandi/Documents/PreparerReconPearson.xlsx');
var WorksheetControlSTR = workbook3.Sheets['ControlStatements'];
var WorksheetPrepareReviewApprove = workbook3.Sheets['MainData_Prepare,Review,Approve'];
var recrevsanitypomR = require('./RecReviewerPOM.js');
var reviewerFun = require('./ReviewerFun.js');
var FrowReconReviewer = WorksheetControlSTR['A14'].v;
var LrowReconReviewer = WorksheetControlSTR['B14'].v;


//-----------------------------------Reviewer Screen-------------------------------------------------
//-----------------------------------Approver Screen-------------------------------------------------

var workbook4 = XLSX.readFile('../SingleTouchAutomationAvnet/ReconCore/PreparerReconAvnet.xlsx');
var WorksheetControlSTA = workbook4.Sheets['ControlStatements'];
var WorksheetPrepareReviewApprove = workbook4.Sheets['MainData_Prepare,Review,Approve'];
var recappsanitypomA = require('./RecApproverPOM.js');
var recappsanityFun = require('./ApproverFun.js');
const { element } = require('protractor');
var FrowReconApprover = WorksheetControlSTA['A14'].v;
var LrowReconApprover = WorksheetControlSTA['B14'].v;

//-----------------------------------Approver Screen-------------------------------------------------
describe('RECON CORE', function () {
    it('TS01_Sanity_Program Admin_Login :', function () {
        //1.Open the Browser,enter QA URL and Hit enter key.
        protractorsynchronization();
        //R2R environment
        // browser.get('https://ra95f9c42cbc274f-ameauto.ame-k8s-automation-617215335b792d24b1b9231440cb6afc-0000.eu-de.containers.appdomain.cloud/');
        reconCreationPOM.Get(WorksheetControlstatement['A2'].v);
        //browser.get(WorksheetLogin['A2'].v);
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(8000);
        //checking Titles of the environment
        // expect(browser.getTitle()).toEqual('Log in to Pearson Test');//xit is an assertion
        //var c = element(by.xpath('/html[1]/body[1]/div[1]/div[1]/div[1]'));
        //expect(c.getText()).toEqual('PEARSON QA');
        //2.Enter Valid Username or email.
        //element(by.id('username')).sendKeys('snandi99@in.ibm.com');
        reconCreationPOM.enterUserName(WorksheetControlstatement['B2'].v);
        //3.Enter Valid Password.
        //element(by.id('password')).sendKeys('r2r123');
        reconCreationPOM.enterPassword(WorksheetControlstatement['C2'].v);
        //element(by.id('password')).sendKeys('Ilovemynation@87');
        //4.Click on Login Button Or Hit Enter Key.
        //element(by.xpath("//input[@id='kc-login']")).sendKeys(protractor.Key.ENTER);
        reconCreationPOM.enterLogin();
        browser.sleep(3000);
        //Click on Assigned  Programs
        click_SignIn();
        //element(by.xpath("//div[contains(@class,'mat-select-panel mat-primary')]")).element(by.xpath("//mat-option/span[contains(text(),'Program Admin')]")).click();
        reconCreationFunction.changeRole(WorksheetControlstatement['E2'].v);
        //reconCreationFunction.Select_ProgramAdmin(WorksheetLogin['E2'].v);
        browser.sleep(3000);
        //var validation1 = element(by.css("notifier-container div[type='notificationData.type']")).getText();
        //var validation1 = reconCreationPOM.validation_ProgramAdmin().getText();
        //expect(validation1).toBe('SWITCHED TO PROGRAM_ADMIN\nclose');

        //Search & Click on The Program.
        //searching for the program in search box.
        //element(by.css("input[placeholder='Search For Programs...']")).sendKeys('pearson recon sanity 4');
        reconCreationPOM.Search_Program(WorksheetControlstatement['A8'].v);
        //element(by.css("input[placeholder='Search For Programs...']")).sendKeys('QA_NEW_FUNCTION_TESTING_PEA');
        //Click on the program.
        //element(by.xpath("//div[contains(text(),'D365 CANADA')]")).click();
        //element(by.xpath("//div[contains(text(),'R2R | RECON')]")).click();
        reconCreationPOM.Click_R2Rrecon();
        browser.sleep(4000);
    });

    for (let i = ReconFRow; i <= ReconLRow; i++) {
        if (PFStamping['B' + i].v == 'FAIL') {

            it('TS02_Sanity_Program Admin_Define Rec Plan :', function () {
                //1.Click on Define Rec Plan from left menu option.
                var DP = reconCreationPOM.click_DefineRecPlans();
                browser.wait(EC.visibilityOf(DP), 20000);
                DP.click();
                //Click on "Define Recon Item / Levels" at first.
                var DRI = reconCreationPOM.clickDefin_ReconItem();
                browser.wait(EC.visibilityOf(DRI), 20000).then(function () {
                    DRI.click();
                });
                //Click on "Manage Rec Groups.
                var MRG = reconCreationPOM.click_ManageRecGroups();
                browser.wait(EC.visibilityOf(MRG), 20000).then(function () {
                    MRG.click();
                    browser.sleep(10000);
                });
                //2.On Manage Rec Groups, Select the  Accounts and Click on Define Group for Items button.
                if (WorksheetControlstatement['B8'].v == 'Samuel') {
                    var mousemove1 = reconCreationFunction.mousemove_GlAccountOrFqan(WorksheetFieldNames['A2'].v);
                    browser.executeScript("arguments[0].scrollIntoView()", mousemove1).then(() => {
                        //clicking on  hidden filter  on glaccount OR FQAN
                        var abc = reconCreationFunction.click_HiddenFilterLeftGLOrFqan(WorksheetFieldNames['C2'].v);
                        abc.click();

                    });
                }
                else {
                    var mousemove1 = reconCreationFunction.mousemove_GlAccountOrFqan(WorksheetFieldNames['A3'].v);
                    browser.executeScript("arguments[0].scrollIntoView()", mousemove1).then(() => {
                        //clicking on  hidden filter  on glaccount.
                        var abc1 = reconCreationFunction.click_HiddenFilterLeftGLOrFqan(WorksheetFieldNames['C3'].v);
                        abc1.click();

                    });
                }
                //click filter under hidden filter.
                //Unselect all the before search
                filteringPrimary2Steps();
                for (let k = glAccOrFQANFColumn; k <= glAccOrFQANLColumn; k++) {
                    var str = columnSelection.identName(k);
                    console.log(str + i);
                    //multiple glaccount selection.
                    //Searching for the particular Glaccount OR FQAN

                    if (WorksheetGLaccountREC[str + i] != null) {
                        var glaccountOrFqanSearch = reconCreationPOM.click_SearchFilter();
                        browser.wait(EC.visibilityOf(glaccountOrFqanSearch), 8000);
                        glaccountOrFqanSearch.sendKeys(WorksheetGLaccountREC[str + i].v);
                        //browser.sleep(1000);
                        let mousemove2 = reconCreationFunction.Click_SearchedItems(WorksheetGLaccountREC[str + i].v);
                        mousemove2.isPresent().then((text) => {
                            console.log('Glaccount OR FQAN:-' + text);
                            if (text == true) {

                                browser.executeScript("arguments[0].click();", mousemove2);

                            }
                        });
                        browser.wait(EC.visibilityOf(glaccountOrFqanSearch), 8000).then(function () {
                            glaccountOrFqanSearch.clear();
                        });

                    }
                }

                //Finally click on apply filter.
                reconCreationPOM.click_ApplyFilter();
                reconCreationPOM.Common_Program();

                var FirstFQANOrGlaccount = reconCreationPOM.click_FirstFQANOrGlaccount();
                FirstFQANOrGlaccount.isPresent().then((text1) => {
                    if (text1 == true) {
                        //Click Top most Square box for secelcting all GL Account and creating group
                        reconCreationPOM.topMostBox_ForSelectingGLAccount();
                        browser.sleep(6000);
                        //Click on 'Define Group For Items'        
                        var DIG = reconCreationPOM.clickDefine_ItemsForGroups();
                        browser.wait(EC.visibilityOf(DIG), 10000).then(function () {
                            DIG.click();
                        });
                        browser.sleep(1000);
                        //Giving the Group Name.
                        reconCreationPOM.give_GroupName(WorksheetReconExecution['B' + i].v);
                        //Click Rec Type
                        browser.sleep(1000);
                        reconCreationPOM.click_RecType();
                        //Select the value from drop down in rec type 
                        reconCreationFunction.select_RecTypeInDefineRecPlan(WorksheetReconExecution['C' + i].v, i);
                        var CG = reconCreationPOM.click_CreateGroup();
                        browser.wait(EC.visibilityOf(CG), 8000).then(function () {
                            CG.click();
                        });
                        browser.sleep(3000);
                        //validation of group added
                        //var validation2 = element(by.css("notifier-container div[type='notificationData.type']")).getText();
                        /* var validation2 = reconCreationPOM.validation_GroupCreation();
                        browser.wait(EC.visibilityOf(validation2), 8000).then(function(){
                            validation2.getText().then((TEXT)=>{ 
                            expect(TEXT).toBe('Group added\nclose');
                            });*/

                    }
                });
                // 3.Click on Manage Rec Plans.
                // Click On 'Manage Rec Plans'
                var MP = reconCreationPOM.click_ManageRecPlans();
                browser.wait(EC.visibilityOf(MP), 30000).then(function () {
                    MP.click();
                });
                browser.sleep(5000);
                //4.Select the Rec Group in left hand side.

                //Select the Rec Group in left hand side
                var unappliedGroupName = reconCreationPOM.Unapplied_GroupName();
                unappliedGroupName.isPresent().then((text3) => {
                    if (text3 == true) {
                        if (WorksheetReconExecution['A' + i].v == 'YES') {
                            var GILS = reconCreationPOM.click_RecGroupInLeftSide();
                            browser.wait(EC.visibilityOf(GILS), 8000).then(function () {
                                GILS.click();

                            });


                        }
                        else {

                            var mousemoveUnapplied = reconCreationPOM.mousemove_RecGroups();
                            browser.executeScript("arguments[0].scrollIntoView()", mousemoveUnapplied).then(() => {
                                reconCreationPOM.click_UnappliedHiddenFilter();
                            });

                            filteringPrimary2Steps();
                            browser.sleep(1000)
                            var GroupName = reconCreationPOM.click_SearchFilter();
                            browser.wait(EC.visibilityOf(GroupName), 8000).then(function () {
                                GroupName.sendKeys(WorksheetReconExecution['B' + i].v);
                            });
                            var mousemoveGroupName = reconCreationFunction.Click_SearchedItems(WorksheetReconExecution['B' + i].v);

                            browser.wait(EC.visibilityOf(mousemoveGroupName), 8000).then(function () {
                                browser.executeScript("arguments[0].click()", mousemoveGroupName);
                            });

                            GroupName.clear();
                            browser.sleep(1000);
                            reconCreationPOM.click_ApplyFilter();

                            reconCreationPOM.Common_Program();
                            var CRGLS = reconCreationPOM.click_RecGroupInLeftSide();

                            browser.executeScript("arguments[0].click()", CRGLS);
                            browser.sleep(2000);

                        }
                    }
                });
                //5.On Right hand side, Select Level 1 data.
                //Companycode  selection 
                //  browser.sleep(2000);

                var unappliedGroupName = reconCreationPOM.Unapplied_GroupName();
                unappliedGroupName.isPresent().then((text3) => {
                    if (text3 == true) {
                        if (WorksheetControlstatement['B8'].v == 'Samuel') {
                            var mousemove3 = reconCreationFunction.mousemove_CompanyCodeOrEntity(WorksheetFieldNames['B2'].v);
                            browser.wait(EC.visibilityOf(mousemove3), 20000).then(function () {
                                browser.executeScript("arguments[0].scrollIntoView()", mousemove3).then(() => {

                                    //browser.actions().mouseMove(mousemove3).perform().then(() => {
                                    //Clicking on  hidden filter  on companycode.
                                    //element(by.xpath("//div[@col-id='companycode']/div[2]/span[1]/span[1]")).click();
                                    var bcd = reconCreationFunction.clickHidden_filterRight_CompanyCodeOrEntity(WorksheetFieldNames['D2'].v);
                                    bcd.click();
                                });
                            });
                        }
                        else {
                            var mousemove3 = reconCreationFunction.mousemove_CompanyCodeOrEntity(WorksheetFieldNames['B3'].v);
                            browser.wait(EC.visibilityOf(mousemove3), 20000).then(function () {
                                browser.executeScript("arguments[0].scrollIntoView()", mousemove3).then(() => {

                                    //browser.actions().mouseMove(mousemove3).perform().then(() => {
                                    //Clicking on  hidden filter  on companycode.
                                    //element(by.xpath("//div[@col-id='companycode']/div[2]/span[1]/span[1]")).click();
                                    var bcd1 = reconCreationFunction.clickHidden_filterRight_CompanyCodeOrEntity(WorksheetFieldNames['D3'].v);
                                    bcd1.click();
                                });
                            });
                        }
                        //Click filter under Hidden filter.
                        //Unselect all the before search
                        //5.On Right hand side, Select Level 1 data.
                        filteringPrimary2Steps();
                        for (k = CompanyCodeOrEntityFcolumn; k <= CompanyCodeOrEntityLcolumn; k++) {
                            var str = columnSelection.identName(k);
                            if (WorksheetCompanyCode[str + i] != null) {

                                //*multiple COMPANYCODE selection.
                                //Searching for the particular Companycode
                                var companycodeSearch = reconCreationPOM.click_SearchFilter();
                                companycodeSearch.sendKeys(WorksheetCompanyCode[str + i].v);
                                browser.sleep(2000);
                                var mousemove4 = reconCreationFunction.Click_SearchedItems(WorksheetCompanyCode[str + i].v);
                                browser.executeScript("arguments[0].click()", mousemove4);
                                browser.sleep(2000);
                                companycodeSearch.clear();
                                browser.sleep(2000);
                            }
                        }
                        //Finally click on apply filter.
                        reconCreationPOM.click_ApplyFilter();
                        reconCreationPOM.Common_Program();
                        //Select all the gl account by clicking on top button
                        //div[@ref='ePinnedLeftHeader']/descendant::div[@ref='eWrapper']/div[1]/span[contains(@class,'unchecked')]
                        reconCreationPOM.click_topboxofGlacc();
                        browser.sleep(2000);
                    }
                });
                //6.Click on ADD INDIVIDUAL or COMBINE  and  Click APPLY,GENERATE & PUBLISH REC PLANS button button based on the Rec Type.


                var unappliedGroupName = reconCreationPOM.Unapplied_GroupName();
                unappliedGroupName.isPresent().then((text3) => {
                    if (text3 == true) {

                        if (WorksheetReconExecution['D' + i].v == 'Combine') {
                            var AC = reconCreationPOM.add_Combine();
                            browser.wait(EC.visibilityOf(AC), 15000).then(function () {
                                AC.click();
                            });

                        }
                        else {

                            var AI = reconCreationPOM.add_Individual();
                            browser.wait(EC.visibilityOf(AI), 15000).then(function () {
                                AI.click();
                            });

                        }
                        //browser.sleep(2000);

                        var AGP = reconCreationPOM.apply_Generate_PublishRecplan();
                        browser.wait(EC.visibilityOf(AGP), 8000).then(function () {
                            AGP.click();
                        });
                        //browser.sleep(1000);
                        //browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
                        //element(by.xpath("//p[contains(text(),'PROGRAM')]")).click();
                        reconCreationPOM.Common_Program();
                        browser.sleep(4000);
                    }
                });


            });

            it('TS03_Sanity_Program Admin_Define Workflow :', function () {
                //1.Select the Recs to define the wokflow by clicking the checkbox.
                reconCreationPOM.define_Workflow();
                browser.sleep(2000);
                var WaitTillVisibilityOfRecGroupsInWorkFlow = reconCreationPOM.WaitTill_VisibilityOf_RecGroups_InWorkFlow();
                browser.wait(EC.invisibilityOf(WaitTillVisibilityOfRecGroupsInWorkFlow), 100000).then(() => {
                    //Changing default Row from 10 to 200
                    changing10To200();
                    //2.Click on Defining levels and Rejection plan button.
                    var workflowRecTypes = reconCreationPOM.WorkFlow_RecTypes();
                    workflowRecTypes.isPresent().then((text4) => {
                        console.log('text4 :' + text4);
                        if (text4 == true) {
                            //Uncheck at first the selected Rec Types
                            var USR = reconCreationFunction.uncheck_SelectedRec();
                            browser.wait(EC.visibilityOf(USR), 20000).then(function () {
                                //USR.click();
                                browser.executeScript("arguments[0].click()", USR);
                            });
                            browser.sleep(7000);
                            var mousemove5 = reconCreationPOM.mousemove_recTypes();
                            browser.executeScript("arguments[0].scrollIntoView()", mousemove5).then(() => {
                                //browser.actions().mouseMove(mousemove5).perform().then(function () {
                                var CHRT = reconCreationFunction.clickhiddenfilter_RecTypes();
                                browser.executeScript("arguments[0].click();", CHRT);
                            });
                            //Unselect all the before search
                            filteringPrimary2Steps();
                            var RecTypeSearch = reconCreationPOM.click_SearchFilter();
                            RecTypeSearch.sendKeys(WorksheetReconExecution['C' + i].v);
                            browser.sleep(2000);
                            var mousemove6 = reconCreationFunction.Click_SearchedReconTypes(WorksheetReconExecution['C' + i].v, i);
                            mousemove6.isPresent().then((text5) => {
                                if (text5 == true) {
                                    browser.wait(EC.visibilityOf(mousemove6), 20000).then(function () {

                                        browser.executeScript("arguments[0].click()", mousemove6);
                                        //browser.actions().mouseMove(mousemove6).click().perform();
                                    });
                                }
                            });
                            //browser.sleep(2000);
                            browser.wait(EC.visibilityOf(RecTypeSearch), 20000).then(function () {

                                RecTypeSearch.clear();
                            })
                            //browser.sleep(2000);
                            //Finally click on apply filter.

                            reconCreationPOM.Common_Program();
                            //Click on the pop up result in the Rec Types section

                            var CPRWF = reconCreationPOM.click_PopupRectypesInworkflow();
                            CPRWF.isPresent().then((text6) => {
                                if (text6 == true) {
                                    browser.wait(EC.visibilityOf(CPRWF), 20000).then(function () {
                                        CPRWF.click();
                                    });
                                    browser.sleep(8000);
                                    //Now select the rec Group which is available &created recently with particular rec types.
                                    mousemoverecgroup = reconCreationPOM.mousemove_RecGroups();
                                    browser.executeScript("arguments[0].scrollIntoView()", mousemoverecgroup).then(() => {
                                        browser.sleep(1000);
                                        var CHFRGWF = reconCreationPOM.click_hiddenfilter_RecGroups_WorkFlow();
                                        browser.executeScript("arguments[0].click()", CHFRGWF);
                                    });
                                    var WRF = reconCreationFunction.Workflow_Recgroups_Filter();
                                    browser.executeScript("arguments[0].click()", WRF);
                                    var UncheckAll2 = reconCreationPOM.uncheck_SelectAll();
                                    browser.executeScript("arguments[0].click()", UncheckAll2);

                                    var recgroupsSearch = reconCreationPOM.click_SearchFilter();
                                    recgroupsSearch.sendKeys(WorksheetReconExecution['B' + i].v);
                                    //browser.sleep(2000);
                                    var CA = reconCreationPOM.check_All();
                                    browser.wait(EC.visibilityOf(CA), 10000).then(function () {
                                        CA.click();
                                    });
                                    reconCreationPOM.Common_Program();
                                    var cde = reconCreationPOM.PresentRec_Groups_InWorkFlow();//element(by.xpath("//div[@role='row'and @row-index='0']/div[@col-id='recGroup']"));
                                    cde.isPresent().then((text6) => {
                                        console.log('text6 :' + text6);
                                        if (text6 == true) {
                                            //Now click on 'Define Levels & Rejection Path'
                                            reconCreationPOM.define_LevelRjectionPath();

                                        }
                                        else {
                                            var NumberOfRecGroups = reconCreationPOM.Number_Of_RecGroups();//element(by.css("div[fxlayoutalign='space-between center'] div p[class='m-0 font-12'] span"));
                                            NumberOfRecGroups.getText().then((Number) => {
                                                var words = Number.split(' ');
                                                console.log(words[3]);
                                                var x = parseInt(words[3]);
                                                var y = x / 200;
                                                console.log('Y:-' + y);
                                                var z = Math.floor(y);
                                                console.log('Z:-' + z);
                                                for (let ii = 1; ii <= z; ii++) {
                                                    var nextbutton = element(by.xpath("//button[@aria-label='Next page']/span[1]"));
                                                    browser.executeScript("arguments[0].click();", nextbutton);
                                                    browser.sleep(18000);
                                                    if (ii == z) {
                                                        reconCreationPOM.define_LevelRjectionPath();
                                                    }
                                                }
                                            });

                                        }
                                    });
                                }
                            });
                        }
                    });
                    //3.On Prepare Section.
                    var attentionPage = reconCreationPOM.AttentionPage_InWorkFlow();
                    attentionPage.isPresent().then((text7) => {
                        //if (text7 == true) {
                        if (WorksheetReconExecution['AK' + i].v === 'NO' && text7 == true) {
                            reconCreationPOM.click_NoAttention();
                            //}
                        }
                        else {
                            if (text7 == true) {
                                reconCreationPOM.click_YESAttention();
                            }
                            browser.sleep(2000);
                            var Preparer = reconCreationPOM.prepare_DueDate();
                            browser.wait(EC.visibilityOf(Preparer), 10000).then(function () {
                                browser.executeScript("arguments[0].click()", Preparer);
                                //browser.actions().mouseMove(Preparer).click().perform();
                            });
                            //browser.sleep(1000);
                            reconCreationFunction.selectL1_PrepareDueDate(WorksheetReconExecution['E' + i].v);
                            //browser.sleep(1000);
                            var Preparer1 = reconCreationPOM.prepare_TaskName();
                            Preparer1.sendKeys(WorksheetReconExecution['F' + i].v);
                            browser.sleep(5000);
                            var Preparer2 = reconCreationPOM.clickPrepare_DefineReason();
                            //browser.actions().mouseMove(Preparer2).click().perform();
                            browser.executeScript("arguments[0].click()", Preparer2);
                            browser.sleep(1000);
                            reconCreationPOM.give_PreparerDefineSubmitReason(WorksheetReconExecution['G' + i].v);
                            reconCreationPOM.prepare_CLICKSUBMIT();
                            browser.sleep(1000);

                            //Want to Add More Prepare Level?(Y/N)
                            if (WorksheetReconExecution['H' + i].v == 'YES') {
                                for (p = 1; p <= WorksheetReconExecution['I' + i].v; p++) {
                                    var NumberOfPrepareLevel = WorksheetReconExecution['I' + i].v;
                                    reconCreationPOM.Prepare_AddLevel();
                                    reconCreationFunction.prepare_LevelAdding(i, p, NumberOfPrepareLevel);


                                }
                            }
                            /*if (WorksheetReconExecution['J'+i].v == 'YES') {
                                reconCreationFunction.delete_prepareLevel(WorksheetReconExecution['K'+i].v);
                            }*/
                        }
                    });
                    //4.On Review Section.
                    //Want to skip the Review Level
                    var DefineLevelRejectionPath1 = reconCreationPOM.DefineLevel_RejectionPath_InWorkFlow();
                    DefineLevelRejectionPath1.isPresent().then((text8) => {
                        if (text8 == true) {

                            if (WorksheetReconExecution['J' + i].v == 'YES') {
                                var SR = reconCreationPOM.skip_Review();
                                browser.wait(EC.visibilityOf(SR), 10000).then(function () {
                                    SR.click();
                                });

                            }
                            else {
                                var q6 = reconCreationPOM.clickReviewL1_dueDate();
                                browser.wait(EC.visibilityOf(q6), 10000).then(function () {
                                    browser.executeScript("arguments[0].click()", q6);
                                    //browser.actions().mouseMove(q6).click().perform();
                                });
                                //browser.sleep(2000);
                                reconCreationFunction.reviewL1_SelectDueDate(WorksheetReconExecution['K' + i].v);
                                //browser.sleep(2000);
                                var q7 = reconCreationPOM.reviewL1_TaskName();
                                q7.sendKeys(WorksheetReconExecution['L' + i].v);
                                browser.sleep(2000);
                                var q8 = reconCreationPOM.clickReviewL1_submitReason();
                                browser.executeScript("arguments[0].click()", q8);
                                //browser.actions().mouseMove(q8).click().perform();
                                browser.sleep(1000);
                                reconCreationPOM.send_ReviewL1_ApproveReason(WorksheetReconExecution['M' + i].v);
                                browser.sleep(2000);
                                reconCreationPOM.click_ReviewReject();
                                browser.sleep(1000);
                                reconCreationPOM.send_ReviewL1RejectReason(WorksheetReconExecution['N' + i].v);
                                browser.sleep(2000);
                                reconCreationPOM.review_CLICKSUBMIT();
                                browser.sleep(1000);

                                if (WorksheetReconExecution['O' + i].v == 'YES') {
                                    for (p = 1; p <= WorksheetReconExecution['P' + i].v; p++) {
                                        var NumberOfReviewLevel = WorksheetReconExecution['P' + i].v;
                                        var mousemoveReviewAddLevel = reconCreationPOM.review_AddLevel();
                                        browser.controlFlow().execute(function () {
                                            browser.executeScript('arguments[0].scrollIntoView(true)', mousemoveReviewAddLevel.getWebElement());
                                        }).then(() => {
                                            mousemoveReviewAddLevel.click();
                                        })

                                        reconCreationFunction.review_LevelAdding(i, p, NumberOfReviewLevel);
                                    }

                                }
                                /*if (WorksheetReconExecution['S'+i].v== 'YES'){
                                    reconCreationFunction.delete_ReviewLevel(WorksheetReconExecution['T'+i].v);
                                }*/

                            }
                        }
                    });
                    //5.On Approve Section.
                    var DefineLevelRejectionPath2 = reconCreationPOM.DefineLevel_RejectionPath_InWorkFlow();
                    DefineLevelRejectionPath2.isPresent().then((text9) => {
                        if (text9 == true) {
                            //Want to skip the Review Level
                            if (WorksheetReconExecution['Q' + i].v == 'YES') {
                                var CR = reconCreationPOM.skip_Approve();
                                browser.wait(EC.visibilityOf(CR), 10000).then(function () {
                                    CR.click();
                                });
                            }
                            else {
                                var Approve1 = reconCreationPOM.click_ApproveL1dueDate();
                                browser.wait(EC.visibilityOf(Approve1), 10000).then(function () {
                                    browser.executeScript("arguments[0].click()", Approve1);
                                    //browser.actions().mouseMove(Approve1).click().perform();
                                });
                                //browser.sleep(2000);
                                reconCreationFunction.approveL1_SelectDueDate(WorksheetReconExecution['R' + i].v);
                                // browser.sleep(1000);
                                var Approve2 = reconCreationPOM.approveL1_taskName();
                                Approve2.sendKeys(WorksheetReconExecution['S' + i].v);
                                browser.sleep(2000);
                                var Approve3 = reconCreationPOM.clickApproveL1_submitReason();
                                browser.executeScript("arguments[0].click()", Approve3);
                                //browser.actions().mouseMove(Approve3).click().perform();
                                browser.sleep(1000);
                                reconCreationPOM.send_ApproveL1_AcceptReason(WorksheetReconExecution['T' + i].v);
                                browser.sleep(2000);
                                reconCreationPOM.click_ApproveReject();
                                browser.sleep(2000);
                                reconCreationPOM.send_ApproveL1RejectReason(WorksheetReconExecution['U' + i].v);
                                browser.sleep(1000);
                                reconCreationPOM.approve_CLICKSUBMIT();
                                browser.sleep(1000);

                                if (WorksheetReconExecution['V' + i].v == 'YES') {

                                    for (p = 1; p <= WorksheetReconExecution['W' + i].v; p++) {
                                        var NumberOfApproveLevel = WorksheetReconExecution['W' + i].v;
                                        var mousemoveApproveAddLevel = reconCreationPOM.approve_AddLevel();
                                        browser.controlFlow().execute(function () {
                                            browser.executeScript('arguments[0].scrollIntoView(true)', mousemoveApproveAddLevel.getWebElement());
                                        }).then(() => {
                                            mousemoveApproveAddLevel.click();
                                        });
                                        reconCreationFunction.approve_LevelAdding(i, p, NumberOfApproveLevel);


                                    }

                                }
                                /*if (WorksheetReconExecution['AB'+i].v == 'YES') {
                                reconCreationFunction.delete_ApproveLevel(WorksheetReconExecution['AC'+i].v);
                                }*/

                            }
                        }
                    });
                    //6.Select Rejection Path either Preapare Level 01 or Immediate Preceding Task Level
                    var DefineLevelRejectionPath3 = reconCreationPOM.DefineLevel_RejectionPath_InWorkFlow();
                    DefineLevelRejectionPath3.isPresent().then((text9) => {
                        if (text9 == true) {
                            var Rejectpath = reconCreationPOM.goTo_Rejectionpath();
                            browser.executeScript("arguments[0].scrollIntoView()", Rejectpath)
                            //browser.actions().mouseMove(Rejectpath).perform();
                            reconCreationFunction.Select_RejectProcess(WorksheetReconExecution['X' + i].v);
                            //browser.sleep(5000);
                        }
                    });
                    //7.Click on APPLY button.
                    var DefineLevelRejectionPath4 = reconCreationPOM.DefineLevel_RejectionPath_InWorkFlow();
                    DefineLevelRejectionPath4.isPresent().then((text9) => {
                        if (text9 == true) {
                            element(by.css("button[type='submit']")).click();
                            element(by.xpath("//p[contains(text(),'PROGRAM')]")).click();
                            browser.sleep(4000);
                        }
                    });
                    //8.Click on PUBLISH FOR ALLOCATION button.
                    var validationRecMapping = reconCreationPOM.Validation_RecMapping();
                    //browser.sleep(3000);
                    validationRecMapping.isPresent().then((text10) => {
                        if (text10 == true) {
                            //FilterRecTypesInWorkFlow(i);
                            browser.sleep(6000);
                            reconCreationPOM.click_PublishForAllocationWorkflow();
                            //element(by.xpath("//p[contains(text(),'PROGRAM')]")).click();
                            reconCreationPOM.Common_Program();
                            var validationWorkFlow = reconCreationPOM.validation_workFlow();
                            expect(validationWorkFlow.isPresent()).toBe(true);
                            //browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
                            browser.sleep(4000);
                        }
                        else {
                            reconCreationPOM.click_PublishForAllocationWorkflow();
                            //element(by.xpath("//p[contains(text(),'PROGRAM')]")).click();
                            reconCreationPOM.Common_Program();
                            var validationWorkFlow = reconCreationPOM.validation_workFlow();
                            expect(validationWorkFlow.isPresent()).toBe(true);
                        }
                    });
                });
                //9.Navigate back by click three horizontal lines before IBM Logo.
                browser.sleep(2000);
                if (WorksheetControlstatement['C8'].v == 'AUTOMATION') {
                    reconCreationPOM.click_Horizontallines();
                    // browser.sleep(2000);
                }
            });

            it('TS04_Sanity_Program Admin_Work Allocation :', function () {
                //1.Click on WORK ALLOCATION Menu.
                browser.sleep(4000);

                reconCreationPOM.click_WorkAllocation();
                browser.sleep(10000);
                var WaitForRecTypesWorkAllocation = reconCreationPOM.wait_ForRecTypesWorkAllocation();
                browser.wait(EC.presenceOf(WaitForRecTypesWorkAllocation), 80000);
                //browser.sleep(3000);
                //Changing default Row from 10 to 200
                changing10To200();
                //2.On Select the Recs button, select the rec type to setup Work Allocation.

                //Uncheck the selected Rec Types.

                browser.sleep(5000);
                var goinsideWorkallocation = reconCreationPOM.GoInside_WorkAllocation();
                browser.wait(EC.presenceOf(goinsideWorkallocation), 90000).then(() => {
                    goinsideWorkallocation.isPresent().then((text11) => {
                        if (text11 == true) {

                            var UWART = reconCreationPOM.Uncheck_WorkAllocationRecTypes();
                            browser.wait(EC.visibilityOf(UWART), 20000).then(function () {
                                UWART.click();
                            });
                            //Filtering the rec types
                            browser.sleep(5000);

                            var mousemove5 = reconCreationPOM.mousemove_recTypesWorkAllocation();
                            browser.executeScript("arguments[0].scrollIntoView()", mousemove5).then(() => {

                                var CHRTWA = reconCreationFunction.clickhiddenfilter_RecTypes_WorkAllocation();
                                browser.executeScript("arguments[0].click()", CHRTWA);
                            });

                            //Unselect all the before search
                            filteringPrimary2Steps();
                            var rectypesSearch = reconCreationPOM.click_SearchFilter();
                            //Search for Recon Types
                            rectypesSearch.sendKeys(WorksheetReconExecution['C' + i].v);
                            browser.sleep(2000);
                            let mousemove6 = reconCreationFunction.Click_SearchedReconTypes(WorksheetReconExecution['C' + i].v, i);
                            mousemove6.isPresent().then((text12) => {
                                if (text12 == true) {
                                    browser.executeScript("arguments[0].click()", mousemove6);

                                }
                            })

                            browser.wait(EC.visibilityOf(rectypesSearch), 50000).then(function () {
                                rectypesSearch.clear();
                            })
                            //FilterRecTypesInWorkAllocation(i);

                            //Finally click on apply filter.
                            reconCreationPOM.Common_Program();
                            //Click on the pop up result in the Rec Types section
                            browser.sleep(3000);
                            var checkingRecTypesWorkAllocation = reconCreationPOM.Check_RecTypes_WorkAllocation();
                            checkingRecTypesWorkAllocation.isPresent().then((text13) => {
                                if (text13 == true) {
                                    var PRTWA = reconCreationPOM.popup_RecTypeWorkAllocation();
                                    browser.wait(EC.visibilityOf(PRTWA), 20000).then(function () {
                                        PRTWA.click();
                                    });
                                    //Selecting Rec Groups of the selected Rec Types
                                    browser.sleep(10000);
                                    RecGroupSelectionWorkAllocation(i);
                                }

                            });
                        }
                    });
                });

                //3.Click on Allocation of Recs button.
                reconCreationPOM.click_AllocateRecs();

                //4.On PREPARE Section, Click on Choose Allocation Method dropdown.
                // Clicking on choose Allocation Method
                var AttentionWorkAllocation = reconCreationPOM.Attention_WorkAllocation();
                AttentionWorkAllocation.isPresent().then((text16) => {
                    if (WorksheetReconExecution['AL' + i].v === 'NO' && text16 == true) {
                        reconCreationPOM.click_NoAttention();
                    }
                    else {
                        if (text16 == true) {
                            reconCreationPOM.click_YESAttention();
                        }
                        var prepareAllocation = reconCreationPOM.click_ChooseAllocation();
                        browser.executeScript("arguments[0].click()", prepareAllocation);

                    }
                });

                //5.Select Named User from the dropdown.(On Preparer)
                var AllocateRecs1 = reconCreationPOM.AllocateRecs_InWorkAllocation();
                AllocateRecs1.isPresent().then((text17) => {
                    if (text17 == true) {

                        reconCreationFunction.select_AllocationMethod(WorksheetReconExecution['Y' + i].v);
                        browser.sleep(2000);
                        //6.From Select Team dropdown, choose the program team from the dropdown.(On Preparer)
                        //clicking on Select team
                        var selectTeam = reconCreationPOM.click_SelectTeam();
                        browser.executeScript("arguments[0].click()", selectTeam);
                        reconCreationFunction.select_Team(WorksheetReconExecution['Z' + i].v);
                        browser.sleep(2000);

                        //7.From  Add Users to Task  dropdown select the required users as a preparer.(On Preparer)
                        //Clicking on Add Users to task
                        var addUser = reconCreationPOM.click_AddUsers();
                        browser.executeScript("arguments[0].scrollIntoView()", addUser);
                        browser.executeScript("arguments[0].click()", addUser);
                        reconCreationFunction.select_Users(WorksheetReconExecution['AA' + i].v);

                        //8.On REVIEW section, Click on Choose Allocation Method dropdown.(On Review)
                        var reviewmousemove1 = reconCreationPOM.click_ReviewAllocationType();
                        browser.executeScript("arguments[0].click()", reviewmousemove1);
                        browser.sleep(2000);

                        //9.Select Named User from the dropdown.(On Review)
                        reconCreationFunction.select_AllocationMethod(WorksheetReconExecution['AB' + i].v);
                        browser.sleep(1000);

                        //10.From Select Team dropdown, choose the program team from the dropdown.(On Review)
                        var selectteam = reconCreationPOM.click_ProgramTeamReview();
                        browser.executeScript("arguments[0].click()", selectteam);
                        reconCreationFunction.select_Team(WorksheetReconExecution['AC' + i].v);
                        browser.sleep(2000);

                        //11.From  Add Users to Task  dropdown select the required users as a preparer.(On Review)
                        var addUsers = reconCreationPOM.click_AddUserReview();
                        browser.executeScript("arguments[0].click()", addUsers);
                        reconCreationFunction.select_Users(WorksheetReconExecution['AD' + i].v);

                        //12.On APPROVE Section, Click on Choose Allocation Method dropdown.(On Approve)
                        var approvemouseMove = reconCreationPOM.click_Approve_Allocation();
                        browser.executeScript("arguments[0].click()", approvemouseMove);
                        browser.sleep(1000);

                        //13.Select Named User from the dropdown.(On Approve)
                        reconCreationFunction.select_AllocationMethod(WorksheetReconExecution['AE' + i].v);
                        browser.sleep(1000);

                        //14.From Select Team dropdown, choose the program team from the dropdown.(On Approve)
                        var selectteam = reconCreationPOM.click_ApproveTeamSelection();
                        browser.executeScript("arguments[0].click()", selectteam);
                        reconCreationFunction.select_Team(WorksheetReconExecution['AF' + i].v);
                        browser.sleep(2000);

                        //15.From  Add Users to Task  dropdown select the required users as a preparer.(On Approve)
                        var addUsers = reconCreationPOM.click_ApproveAddUsers();
                        browser.executeScript("arguments[0].click()", addUsers);
                        reconCreationFunction.select_Users(WorksheetReconExecution['AG' + i].v);
                        browser.sleep(3000);

                        // 16.Click in APPLY button.'
                        reconCreationPOM.click_ApplyWorkAllocation();
                        browser.sleep(2000);

                    }
                });
                var ApplyRecGroupPopup = reconCreationPOM.Validation_AllocateRecsIn_WorkAllocationAfterApply();
                ApplyRecGroupPopup.isPresent().then((ApplyPopUp) => {
                    if (ApplyPopUp == true) {
                        // FilterRecTypesInWorkAllocation(i);
                        browser.sleep(9000);
                        RecGroupSelectionWorkAllocation(i);
                        //17.Click on PUBLISH button.
                        reconCreationPOM.click_PublishWorkAllocation();
                        //reconCreationFunction.WorkAllocation_Submit_ProofOf_Approval('Sandip Nandi');
                        reconCreationPOM.Common_Program();
                        var validationWorkAllocation = reconCreationPOM.validation_workAllocation();
                        expect(validationWorkAllocation.isPresent()).toBe(true);
                        browser.sleep(4000);
                    }
                    else {
                        // browser.sleep(2000);
                        //17.Click on PUBLISH button.
                        reconCreationPOM.click_PublishWorkAllocation();
                        reconCreationFunction.WorkAllocation_Submit_ProofOf_Approval('Sandip Nandi');
                        reconCreationPOM.Common_Program();
                        var validationWorkAllocation = reconCreationPOM.validation_workAllocation();
                        expect(validationWorkAllocation.isPresent()).toBe(true);
                        browser.sleep(4000);
                    }


                });
                //18.Navigate back by click three horizontal lines before IBM Logo.
                browser.sleep(2000);
                if (WorksheetControlstatement['C8'].v == 'AUTOMATION') {
                    reconCreationPOM.click_Horizontallines();
                }
                // browser.sleep(1000);
            });

            it('TS05_Sanity_Program Admin_Rec Exexcution Plan :', function () {


                var CREP = reconCreationPOM.Click_RecExecutionPlan();
                browser.executeScript("arguments[0].click()", CREP);
                browser.sleep(2000);
                changing10To200();
                browser.sleep(6000);


                reconCreationPOM.Uncheck_RecTypesRecExecutionPlan();
                browser.sleep(1000);
                var recplanRecTypes = reconCreationPOM.MouseMove_RecPlanRecTypes();

                browser.sleep(1000);
                browser.executeScript("arguments[0].scrollIntoView()", recplanRecTypes);

                browser.sleep(1000);

                reconCreationPOM.HiddenFilter_RecExecutionPlan();
                browser.sleep(1000);
                filteringPrimary2Steps();

                var GiveInputInFilterRecExecutionPlan1 = reconCreationPOM.click_SearchFilter();
                GiveInputInFilterRecExecutionPlan1.sendKeys(WorksheetReconExecution['C' + i].v);

                var mousemove12 = reconCreationFunction.Click_SearchedReconTypes(WorksheetReconExecution['C' + i].v, i);
                mousemove12.isPresent().then((text22) => {
                    if (text22 == true) {
                        browser.wait(EC.visibilityOf(mousemove12), 20000).then(function () {
                            browser.executeScript("arguments[0].click();", mousemove12);

                        });
                    }
                });
                var RecTypeSearch = reconCreationPOM.click_SearchFilter();
                browser.wait(EC.visibilityOf(RecTypeSearch), 20000).then(function () {
                    RecTypeSearch.clear();
                });

                //Finally click on apply filter.
                reconCreationPOM.Common_Program();
                browser.sleep(1000);
                reconCreationPOM.Uncheck_RecTypesRecExecutionPlan();
                browser.sleep(30000);

                var group = reconCreationPOM.mouseMove_GroupOnRecExecutionPlan();
                browser.executeScript("arguments[0].scrollIntoView()", group);

                //Click on Hidden Filter in Rec Plan
                var clickHiddenFilter = reconCreationPOM.click_HiddenFilterOfGroupInRecExecutionPlan();
                browser.executeScript("arguments[0].click();", clickHiddenFilter);
                browser.sleep(2000);
                filteringPrimary2Steps();

                var GiveInputInFilterRecExecutionPlan2 = reconCreationPOM.click_SearchFilter();
                GiveInputInFilterRecExecutionPlan2.sendKeys(WorksheetReconExecution['B' + i].v);

                var mousemove14 = reconCreationFunction.Click_SearchedItems(WorksheetReconExecution['B' + i].v, i);
                mousemove14.isPresent().then((text23) => {
                    if (text23 == true) {
                        browser.wait(EC.visibilityOf(mousemove14), 20000).then(function () {
                            browser.executeScript("arguments[0].click()", mousemove14);

                            var RecTypeSearch = reconCreationPOM.click_SearchFilter();
                            browser.wait(EC.visibilityOf(RecTypeSearch), 20000).then(function () {
                                RecTypeSearch.clear();
                            });
                        });
                    }
                });
                //Finally click on apply filter.
                reconCreationPOM.click_ApplyFilter();
                reconCreationPOM.Common_Program();
                browser.sleep(1000);
                var presenceofRecGroup = reconCreationPOM.presenceOf_GroupRecExecutionPlan();
                presenceofRecGroup.isPresent().then((ee) => {
                    console.log(ee);
                    if (ee == true) {

                        RecExecutionPlanAssignPeriod(WorksheetReconExecution['AH' + i].v);
                    }
                    else {
                        var recNumber = reconCreationPOM.RecNumber_InRecExecutionPlan();
                        recNumber.getText().then((RecNum) => {
                            var words = RecNum.split(' ');
                            console.log(words[1]);
                            var x = words[1];
                            var y = x.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '');
                            console.log('Y:-' + y);
                            yy = y / 200;
                            var z = Math.floor(yy);
                            console.log('Z:-' + z);
                            for (let j = 1; j <= z; j++) {

                                var nextbutton = reconCreationPOM.NextPage_RecExecutionPlan();
                                browser.executeScript("arguments[0].click();", nextbutton);
                                browser.sleep(18000);
                                if (j == z) {
                                    RecExecutionPlanAssignPeriod(WorksheetReconExecution['AH' + i].v);

                                }
                            }

                        });


                    }
                });
                PFStamping['C2'].v = i;
                XLSX.writeFile(workbook, '../SingleTouchAutomationAvnet/ReconCore/Automation_PassFail_StampingAvnet.xlsx');
                var validationRecExecutionPlan = reconCreationPOM.validation_RecExePlan();
                expect(validationRecExecutionPlan.isPresent()).toBe(true);
                //18.Navigate back by click three horizontal lines before IBM Logo.

                //reconCreationPOM.click_Horizontallines();

            });

            it('TS06_Sanity_Program Admin_Manual Execution :', function () {
                //1.Click on Manual Execution in Menu.
                reconCreationPOM.click_ManualExecution();
                browser.sleep(3000);

                //Changing the Row number 10 to 200(Maximum one is used for give script more flexibility)
                changing10To200();
                //Select the exact Month
                var SelectMonthInManualExecution = reconCreationFunction.clickMonth_InManualExecution(WorksheetReconExecution['AM' + i].v);//'Aug-20'
                SelectMonthInManualExecution.isPresent().then((SM) => {
                    if (SM == true) {
                        browser.executeScript("arguments[0].click()", SelectMonthInManualExecution);
                    }
                    else {
                        reconCreationPOM.ClickArrow_InManualExecution_ToSelectMonth();
                        browser.executeScript("arguments[0].click()", SelectMonthInManualExecution);
                    }
                });

                //2.Select the Rec Type by clicking the checkbox in left hand side.
                //click on non-executed in manuel execution
                browser.sleep(5000);
                var CNE = reconCreationPOM.Click_NonExecuted();
                browser.executeScript("arguments[0].click()", CNE);
                //Need Multiple Selection? -> ' Multi Select Rec Types (28) '
                if (WorksheetReconExecution['AJ' + i].v == 'NO') {
                    reconCreationPOM.Multiple_RecSelection();
                }
                else {
                    //Atfirst uncheck all default selected rec types.
                    browser.sleep(5000);
                    reconCreationPOM.Uncheck_Alldefault_SelectedRecon();
                }
                var mousemove9 = reconCreationPOM.mousemove_recTypes();
                browser.executeScript("arguments[0].scrollIntoView()", mousemove9).then(() => {

                    reconCreationPOM.clickhiddenfilter_RecTypes_ManualExecution();
                });
                //Unselect all the before search
                filteringPrimary2Steps();
                var recTypesSearch = reconCreationPOM.click_SearchFilter();
                //Rec Types
                recTypesSearch.sendKeys(WorksheetReconExecution['C' + i].v);
                browser.sleep(2000);
                var mousemove10 = reconCreationFunction.Click_SearchedReconTypes(WorksheetReconExecution['C' + i].v, i)
                mousemove10.isPresent().then((text25) => {
                    if (text25 == true) {
                        browser.executeScript("arguments[0].click()", mousemove10);

                        browser.sleep(2000);
                    }
                });
                recTypesSearch.clear();
                browser.sleep(2000);
                //Finally click on apply filter.
                reconCreationPOM.Common_Program();

                //Click on the pop up result in the Rec Types section
                browser.sleep(3000);
                reconCreationPOM.click_PopUpType_ManualExecution();
                browser.sleep(10000);
                //3.Select the Rec group for which job has to run,by clicking checkbox.

                //Want to select All?-rec groups
                if (WorksheetReconExecution['AI' + i].v == 'YES') {
                    browser.sleep(6000);
                    reconCreationPOM.select_AllRecGroups();
                }
                else {
                    var groupManualExecution = reconCreationPOM.mouseMove_GroupOnManualExecution();
                    browser.executeScript("arguments[0].scrollIntoView()", groupManualExecution).then(() => {

                        reconCreationPOM.click_hiddenfilter_RecGroups_ManualExecution();
                    });
                    //Unselect all the before search
                    filteringPrimary2Steps();
                    var recGroupSearch = reconCreationPOM.click_SearchFilter();
                    recGroupSearch.sendKeys(WorksheetReconExecution['B' + i].v);
                    browser.sleep(2000);
                    var mousemove12 = reconCreationFunction.Click_SearchedItems(WorksheetReconExecution['B' + i].v, i);
                    mousemove12.isPresent().then((RR) => {
                        if (RR == true) {
                            browser.executeScript("arguments[0].click();", mousemove12);
                            browser.sleep(2000);
                            recGroupSearch.clear();
                            browser.sleep(2000);

                        }
                        else {
                            //check whether the filtered rec groups is available or not?
                            var presenceofRecGroup = reconCreationFunction.PresenceOfRecGroups_In_ManualExecution(WorksheetReconExecution['B' + i].v);
                            presenceofRecGroup.isPresent().then((ee) => {
                                console.log("ee :" + ee);
                                if (ee == true) {

                                    var NonExecutedRow = reconCreationPOM.NumberOf_NonExecutedRow_InManualExecution();
                                    browser.wait(EC.presenceOf(NonExecutedRow), 30000);
                                    NonExecutedRow.count().then((tt) => {
                                        console.log('tt :' + tt);
                                        if (tt > 1) {

                                            FindGroupNameInManualExecution(i);

                                        }
                                    });

                                }
                                else {
                                    var NumOfNonExecutedRec = element(by.css("mat-toolbar[fxlayoutalign='start center'] span[style='margin-right: 8px;']"));
                                    NumOfNonExecutedRec.getText().then((hh) => {
                                        var words = hh.split(' ');
                                        console.log(words[1]);
                                        var x = words[1];
                                        var y = x.replace(/[&\/\\#,+()$~%'":*?<>{}]/g, '');
                                        console.log('Y:-' + y);
                                        yy = y / 200;
                                        var z = Math.floor(yy);
                                        console.log('Z:-' + z);
                                        for (let j = 1; j <= z; j++) {
                                            var nextbutton = reconCreationPOM.NextPage_RecExecutionPlan();
                                            browser.executeScript("arguments[0].click();", nextbutton);
                                            browser.sleep(18000);
                                            if (j == z) {
                                                var NonExecutedRow = reconCreationPOM.NumberOf_NonExecutedRow_InManualExecution();
                                                browser.wait(EC.presenceOf(NonExecutedRow), 30000);
                                                NonExecutedRow.count().then((tt) => {
                                                    if (tt > 1) {

                                                        FindGroupNameInManualExecution(i);

                                                    }

                                                });

                                            }
                                        }

                                    });


                                }
                            });
                        }
                    });
                    //Finally click on apply filter.
                    reconCreationPOM.click_ApplyFilter();
                    reconCreationPOM.Common_Program();

                }

                //4.Click on EXECUTE button.
                browser.sleep(2000);
                var CGN = reconCreationPOM.Check_GroupName_InManualExecution();
                CGN.isPresent().then((TEXT) => {
                    if (TEXT == true) {
                        console.log('TEXT :' + TEXT)
                        CGN.getText().then((text) => {
                            console.log('text:' + text);
                            console.log('text1 :' + WorksheetReconExecution['B' + i].v);
                            if (text == WorksheetReconExecution['B' + i].v) {
                                PFStamping['B' + i].v = 'PASS';
                                PFStamping['A' + i].v = text;
                                XLSX.writeFile(workbook, '../SingleTouchAutomationAvnet/ReconCore/Automation_PassFail_StampingAvnet.xlsx');
                            }
                            else {

                                PFStamping['B' + i].v = 'FAIL';
                                PFStamping['A' + i].v = text;
                                XLSX.writeFile(workbook, '../SingleTouchAutomationAvnet/ReconCore/Automation_PassFail_StampingAvnet.xlsx');
                            }
                        });
                        var clickOnPopUpGroups = reconCreationPOM.ClickOnPopUp_Groups_InManualExecution();
                        browser.executeScript("arguments[0].click();", clickOnPopUpGroups);
                        browser.sleep(2000);
                        var WaitForExecute = reconCreationPOM.WaitFor_ExecuteBar_InManualExecution();
                        browser.wait(EC.presenceOf(WaitForExecute), 30000);
                        //******Commented PreviousLy******reconCreationPOM.click_ExecuteSelectedRecs();
                        reconCreationPOM.ClickOn_ExecuteButton_InMnaualExecution();
                        browser.sleep(1000);
                        reconCreationPOM.ClickOn_YESAfter_ExecuteInManualExecution();
                        reconCreationPOM.Common_Program();
                        var validationManualExecution = reconCreationPOM.validation_ManualExecution();
                        expect(validationManualExecution.isPresent()).toBe(true);
                        browser.sleep(6000);
                    }
                    else {
                        PFStamping['B' + i].v = 'FAIL';
                        PFStamping['A' + i].v = 'Blanks';
                        XLSX.writeFile(workbook, 'C:/Users/SandipNandi/Project/SingleTouchAutomationAvnet/ReconCore/Automation_PassFail_StampingAvnet.xlsx');
                    }
                    //browser.refresh();
                    //browser.sleep(15000);

                });


            });

        }
    }
    it('TS07_Complete Status of Execution For Last Recon Groups.', function () {
        for (let p = 1; p <= 20; p++) {
            var checkloginpage = reconCreationPOM.Check_LogInPage();
            checkloginpage.isPresent().then((hh) => {
                if (hh == false) {

                    var ClickRecExecutionStatus = reconCreationPOM.Click_RecExecutionStatus();
                    browser.wait(EC.presenceOf(ClickRecExecutionStatus), 120000).then(() => {
                        browser.sleep(2000);
                        browser.executeScript("arguments[0].click()", ClickRecExecutionStatus);
                    });
                    browser.sleep(4000);
                    var click50 = reconCreationPOM.Click_50();
                    browser.executeScript("arguments[0].click()", click50).then(() => {

                        reconCreationPOM.Change_Into200();
                        browser.sleep(1000);
                    });
                    var executionstauseRecTypes = reconCreationPOM.MouseMove_RecExecutionStatusRecTypes();//element(by.xpath("//span[contains(text(),'Rec Types ')]"));
                    browser.executeScript("arguments[0].scrollIntoView();", executionstauseRecTypes);
                    browser.sleep(1000);
                    var HFRES = reconCreationPOM.HiddenFilter_RecExecutionStatus();
                    browser.executeScript("arguments[0].scrollIntoView();", HFRES);
                    browser.sleep(1000);
                    browser.executeScript("arguments[0].click();", HFRES);
                    browser.sleep(1000);
                    // reconCreationPOM.uncheck_SelectAll();
                    filteringPrimary2Steps();
                    var rectypesSearch = reconCreationPOM.click_SearchFilter();
                    //Search for Recon Types
                    rectypesSearch.sendKeys(WorksheetReconExecution['C' + ReconLRow].v);
                    browser.sleep(2000);
                    let mousemove6 = reconCreationFunction.Click_SearchedReconTypes(WorksheetReconExecution['C' + ReconLRow].v, ReconLRow);
                    mousemove6.isPresent().then((text12) => {
                        if (text12 == true) {
                            browser.executeScript("arguments[0].click()", mousemove6);
                        }
                    });
                    reconCreationPOM.Common_Program();
                    var recGroupExecution = reconCreationPOM.RecGroupName_InRec_ExecutionStatus(); //element(by.xpath("//span[contains(text(),'Rec Group Name')]"));
                    browser.executeScript("arguments[0].scrollIntoView();", recGroupExecution).then(() => {
                        reconCreationPOM.HiddenFilter_ClickInRecGroupName_InRecExecutionStatus();
                        browser.sleep(1000);
                        reconCreationPOM.ClickOnRealFilter_UnderRecGroupName_InRecExecutionStatus();
                        var USA = reconCreationPOM.uncheck_SelectAll();
                        browser.executeScript("arguments[0].click()", USA);
                        var recGroupSearch = reconCreationPOM.click_SearchFilter();
                        //Search for Recon Types
                        recGroupSearch.sendKeys(WorksheetReconExecution['B' + ReconLRow].v);
                        browser.sleep(2000);
                        let mousemove67 = reconCreationFunction.Click_SearchedItems(WorksheetReconExecution['B' + ReconLRow].v, ReconLRow);
                        mousemove67.isPresent().then((text22) => {
                            console.log('text22:' + text22);
                            if (text22 == true) {
                                browser.executeScript("arguments[0].click();", mousemove67);
                            }

                        });
                    });
                    //Finally click on apply filter.
                    reconCreationPOM.click_ApplyFilter();
                    browser.sleep(2000);
                    var CheckRecGroupNameInExecutonStatus = reconCreationPOM.Check_RecGroupName_InExecutionStatus();//element(by.xpath("//div[@ref='eCenterViewport']/div[@role='rowgroup']/div[@role='row'and@row-index='0']"));
                    CheckRecGroupNameInExecutonStatus.isPresent().then((RGNES) => {
                        console.log('RGNES :' + RGNES);
                        if (RGNES == true) {
                            var ScrollToGLaccount = reconCreationPOM.ScrollTo_GLaccount_InRecExecutionStatus();//element(by.xpath("//span[contains(text(),'glaccount')]"));
                            browser.executeScript("arguments[0].scrollIntoView();", ScrollToGLaccount);
                            browser.sleep(1000);
                            var scrollToCCode = reconCreationPOM.ScrollTo_CompanyCode_InRecExecutionStatus();//element(by.xpath("//span[contains(text(),'companycode')]"));
                            browser.executeScript("arguments[0].scrollIntoView();", scrollToCCode);
                            browser.sleep(1000);
                            var scrollToQueueNo = reconCreationPOM.Scroll_ToQueueNo_InRecExecutionStatus();//element(by.xpath("//span[contains(text(),'Queue No.')]"));
                            browser.executeScript("arguments[0].scrollIntoView();", scrollToQueueNo);
                            browser.sleep(1000);
                            var scrollToStatus = reconCreationPOM.Scroll_ToState_InRecExecutionStatus();//element(by.xpath("//span[contains(text(),'State')]"));
                            browser.executeScript("arguments[0].scrollIntoView();", scrollToStatus);

                            var CompleteStatusforPopups = reconCreationPOM.CompleteStatus_forPopups_InRecExecutionStatus();//element(by.xpath("//ag-grid-angular[2]/div[1]/div[2]/div[1]/div[3]/div[2]/div[1]/div[1]/div[1]/div[@col-id='recJobState'][contains(text(),'Complete')]"));
                            CompleteStatusforPopups.getText().then((gg) => {
                                if (gg == 'Completed') {
                                    var avtar = reconCreationPOM.ScrollTo_Avatar_InRecExecutionPlan();//element(by.css("button span[class='mat-button-wrapper'] div img[class='avatar']"));
                                    browser.executeScript("arguments[0].scrollIntoView();", avtar).then(() => {
                                        avtar.click();
                                    });
                                    reconCreationPOM.ClickOn_SignOut();
                                    console.log('**************************** PROGRAM ADMIN FINISHED ************************************');
                                    browser.sleep(8000);

                                }
                                else if (gg == 'PreparationFailure' || gg == 'ExecutionFailure') {
                                    var avtar = reconCreationPOM.ScrollTo_Avatar_InRecExecutionPlan();
                                    browser.executeScript("arguments[0].scrollIntoView();", avtar).then(() => {
                                        avtar.click();
                                    });
                                    reconCreationPOM.ClickOn_SignOut();
                                    console.log('********* PROGRAM ADMIN FAILURE,REC GROUP NAME IS NOT AVAILABLE *****************');
                                    browser.sleep(8000);

                                }
                                else {
                                    browser.refresh();
                                    browser.sleep(12000);
                                }

                            });
                        }
                        else {
                            var avtar = reconCreationPOM.ScrollTo_Avatar_InRecExecutionPlan();
                            browser.executeScript("arguments[0].scrollIntoView();", avtar).then(() => {
                                avtar.click();
                            });
                            reconCreationPOM.ClickOn_SignOut();
                            console.log('********* PROGRAM ADMIN FAILURE,REC GROUP NAME IS NOT AVAILABLE *****************');
                            browser.sleep(8000);

                        }

                    });
                }
            });
        }
    });

    //--------------------------------------Preparer Screen---------------------------------------------
    it('TS01_Preparer Screen Login :-', function () {
        // Open the Browser,enter QA URL and Hit enter key :
        protractorsynchronization();

        RecPreparerPOM.Get(WorksheetControlST['A2'].v, 4000);
        browser.sleep(10000);
        //Enter Valid Username or email :
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(60000);
        //Here we are entering the username

        RecPreparerPOM.enterUserName(WorksheetControlST['B2'].v);
        //Enter Valid Password :
        RecPreparerPOM.enterPassword(WorksheetControlST['C2'].v);
        //('Click on Login Button Or Hit Enter Key :'
        RecPreparerPOM.enterLogin();
        browser.sleep(3000);
        //Click on Assigned  Programs
        click_SignIn();
        RecPreparerFun.ChangeInto_PreparerRole(WorksheetControlST['D2'].v);

        browser.sleep(3000);
    });

    it('TS02_Preparer_Validate Preparer Screen :- ', function () {
        //Choose RECONCILIATION/MONTH END CLOSE/JOURNAL & Click on assigned Program :
        if (WorksheetControlST['A10'].v === 'RECONCILIATION') {
            var expandRecon = RecPreparerPOM.Expand_Recon();
            expandRecon.getAttribute('aria-expanded').then((Ftext) => {
                //console.log(Ftext);
                if (Ftext != false) {
                    browser.sleep(1000);
                    RecPreparerFun.Click_OnProgramPreparerScreen(WorksheetControlST['B10'].v);

                }
                else {
                    var expandRecon = RecPreparerPOM.Expand_Recon();
                    browser.executeScript("arguments[0].click()", expandRecon);
                    browser.sleep(1000);
                    RecPreparerFun.Click_OnProgramPreparerScreen(WorksheetControlST['B10'].v);
                }
            });
        }

    });

    for (let i = FrowReconPreparer; i <= LrowReconPreparer; i++) {

        it('#TS03_Preparer_Selecting recon & Adding Comment and Attachment at Recon Level: ', function () {
            // 1.Click on the Workunitname which needs to be validated
            browser.sleep(3000);
            var presentofoneRow = RecPreparerPOM.Presence_OfAtleastOneRow();
            browser.wait(EC.presenceOf(presentofoneRow), 80000).then(() => {

                RecPreparerPOM.ClickOn_CommonProgram();
            });
            browser.sleep(4000);
            changing10To200();
            browser.sleep(10000);

            var mousemove1 = RecPreparerPOM.MouseMove_RecGroupName();
            mousemove1.isPresent().then((val) => {
                if (val != false) {
                    browser.executeScript("arguments[0].scrollIntoView()", mousemove1);
                    //clicking on  hidden filter  on recon group name.

                    var HFIRGN = RecPreparerPOM.ClickOn_HiddenFlter_InRecGroupName();
                    browser.executeScript("arguments[0].click()", HFIRGN);

                    //click filter under hidden filter.

                    var RFPS = RecPreparerPOM.ClickRealFilter_UnderHiddenFilter_PreparerScreen();
                    browser.executeScript("arguments[0].click()", RFPS);
                    //Unselect all the before search

                    var USA = RecPreparerPOM.UnSelect_All();
                    browser.executeScript("arguments[0].click()", USA);
                    //Searching for the particular rec group name

                    RecPreparerPOM.Input_GroupName(WorksheetPrepareReviewApprove['A' + i].v);

                    //Select all after search
                    var sa = RecPreparerPOM.Select_All();
                    browser.executeScript("arguments[0].click();", sa);
                    browser.sleep(1000);

                    RecPreparerPOM.ClickOn_ApplyButton_AfterFilter();

                    RecPreparerPOM.ClickOn_CommonProgram();
                    browser.sleep(1000);

                    var clickRecGroup = RecPreparerPOM.ClickOn_PopUpRecGroups();
                    clickRecGroup.isPresent().then((q) => {
                        console.log("q: " + q)
                        if (q == true) {
                            //Comment / Atatchement(Recon level)
                            var addCommentsReconLevel = RecPreparerPOM.Add_Comments_ReconLevel();
                            browser.executeScript("arguments[0].scrollIntoView()", addCommentsReconLevel);
                            browser.executeScript("arguments[0].click()", addCommentsReconLevel);
                            browser.sleep(1000);
                            CommentsAndAttachmentsP('Want some details for Recon Level In Preparer.');
                            browser.sleep(2000);
                            clickRecGroup.click();
                            browser.sleep(1000);
                            //var validation3 = element(by.css("notifier-container div[type='notificationData.type']")).getText();
                            //expect(validation3).toBe('Task Acquired Successfully\nclose');
                            browser.sleep(2000);
                            var checkforDataShowing = RecPreparerPOM.DataLoading_InProgess();
                            checkforDataShowing.isPresent().then((cds) => {
                                if (cds == true) {
                                    var checkforDataShowing1 = RecPreparerPOM.WaitFor_InvisibilityOf_DataLoading();
                                    browser.wait(EC.invisibilityOf(checkforDataShowing1), 200000);

                                }
                            });

                        }

                        else {
                            var CAC = RecPreparerPOM.ClickOn_AutoCertified();
                            browser.executeScript("arguments[0].click()", CAC);
                            browser.sleep(6000);
                            var checkAutocertify1 = RecPreparerPOM.Click_AutoCertify_Row1();
                            checkAutocertify1.isPresent().then((qq) => {
                                if (qq == true) {

                                    checkAutocertify1.click();
                                    var checkforDataShowing = RecPreparerPOM.DataLoading_InProgess();
                                    checkforDataShowing.isPresent().then((cds) => {
                                        if (cds == true) {
                                            var checkforDataShowing1 = RecPreparerPOM.WaitFor_InvisibilityOf_DataLoading();
                                            browser.wait(EC.invisibilityOf(checkforDataShowing1), 200000);

                                        }
                                    });
                                    browser.sleep(2000);
                                    //var validation3 = element(by.css("notifier-container div[type='notificationData.type']")).getText();
                                    //expect(validation3).toBe('Task Acquired Successfully\nclose');
                                    //browser.sleep(2000);

                                }

                            });

                        }
                    });
                }

            });
            //Summary and Validation Level Variance Or Unexplained Amount
            browser.sleep(2000);
            RecPreparerFun.Check_ALLExplained_And_UnexplainedAmount_InSummeryAndValidation();
            browser.sleep(2000);

           /* var CTBIS = RecPreparerPOM.Check_Trial_BalanceInSummary();
            CTBIS.getText().then((ctbis) => {
                //Match Trail Balance with Rec Grid closing balance
                var CRG = RecPreparerPOM.Click_RecGrids();
                browser.executeScript("arguments[0].click()", CRG);
                browser.sleep(1000);
                var ClickTrailBalanace = RecPreparerPOM.Click_TrailBalance_InRecGrids();
                browser.executeScript("arguments[0].click()", ClickTrailBalanace);
                browser.sleep(5000);
                var CMO1 = RecPreparerPOM.Click_MoreOptions();
                browser.executeScript("arguments[0].click()", CMO1);
                browser.sleep(1000);
                var RowOfClosingBalance = RecPreparerPOM.check_RowIn_RecGrids();
                browser.executeScript("arguments[0].click()", RowOfClosingBalance);
                browser.sleep(2000);
                var ShowingAllRow = RecPreparerPOM.Showing_All_Rows();
                ShowingAllRow.getText().then((RCB) => {
                    if (RCB != 'Showing All Rows (0)') {
                        F3StepsOfGlobalFilter();
                        var GADDVGFRG = RecPreparerPOM.GetAll_DropDown_ValueIn_GlobalFilter_RecGrids();
                        GADDVGFRG.getText().then((gaddvgrg) => {
                            var ClickGlobalFilter = RecPreparerPOM.ClickOn_Global_Filter();
                            browser.executeScript("arguments[0].scrollIntoView()", ClickGlobalFilter);
                            browser.executeScript("arguments[0].click()", ClickGlobalFilter);
                            browser.sleep(1000);
                            var clickdiscard = RecPreparerPOM.ClickOn_Discard();
                            browser.executeScript("arguments[0].scrollIntoView()", clickdiscard);
                            browser.executeScript("arguments[0].click()", clickdiscard);
                            for (let o = 5; o <= 20; o++) {
                                var ClosingBalance = RecPreparerPOM.ScrollTo_ClosingBalance_InRecGrids();
                                ClosingBalance.isPresent().then((CC) => {
                                    console.log('CLOSING BALANCE:-' + CC);

                                    if (CC == true) {
                                        browser.sleep(1000);
                                        browser.executeScript("arguments[0].scrollIntoView()", ClosingBalance);
                                        var vCB = RecPreparerPOM.Varify_Closing_Balence_InRecGrids();
                                        //Matching Trail Balance with rec grid closing balance    
                                        expect(vCB.getText()).toEqual(ctbis);

                                    }
                                    else {
                                        var scrollToPoint = element(by.xpath("//span[contains(text(),'" + gaddvgrg[o] + "')]"));
                                        browser.executeScript("arguments[0].scrollIntoView()", scrollToPoint);

                                    }

                                });
                            }
                        });
                        //Download Excel in Rec Grid
                        var DERG = RecPreparerPOM.Download_Excel();
                        browser.executeScript("arguments[0].click()", DERG);
                        //browser.manage().timeouts().implicitlyWait(7000);
                        browser.manage().timeouts().implicitlyWait(7000);
                        var EDV = RecPreparerPOM.Excel_DownLoad_Validation();
                        browser.manage().timeouts().implicitlyWait(7000);
                        expect(EDV.isPresent()).toEqual(true);
                    }
                });


            });*/

        });

        it('TS04_Preparer_Validating Status(Preparer Acquire and Summary): ', function () {
            browser.sleep(2000);
            var PS = RecPreparerPOM.Preparer_Status();
            browser.executeScript("arguments[0].scrollIntoView()", PS);
            browser.manage().timeouts().implicitlyWait(6000);
            var Acquire = RecPreparerPOM.Preparer_Check_Acquire();
            Acquire.getAttribute('title').then((A) => {
                if (A == 'ACQUIRED') {
                    console.log('Work Unit is ACQUIRED by Preparer Screen.');
                    browser.manage().timeouts().implicitlyWait(6000);
                    browser.executeScript("arguments[0].click()", Acquire);
                    browser.sleep(1000);
                    var PPAS = RecPreparerPOM.Preparer_Participant_And_AcquiedStatus();
                    PPAS.getText().then((B) => {
                        console.log(B);
                    });
                    browser.sleep(1000);
                    RecPreparerPOM.Close_Acquire_Status();
                }
                else {
                    console.log(A);
                }

            });
        });

        it('TS05_Preparer_MRI line Addition & Preparer_MRI Schedule update in summary and validation: ', function () {
            var CSV1=RecPreparerPOM.ClickOn_Summary_Validation();
            browser.executeScript("arguments[0].click()", CSV1);
            browser.sleep(1000);
            var PS = RecPreparerPOM.Preparer_Status();
            browser.executeScript("arguments[0].scrollIntoView()", PS);
            browser.manage().timeouts().implicitlyWait(6000);
            var Acquire = RecPreparerPOM.AutoCertify_Status();
            Acquire.getText().then((sys) => {
                if (sys != 'SYSTEM_CLOSED') {
                    var FVIST = RecPreparerPOM.Find_Variance_InSummaryTab();
                    FVIST.getText().then((fvist) => {
                        //MRI Line Addition in MRI GRids:
                        if (fvist == 0.00 || fvist == 0.000 || fvist == 0.0000) {
                            var CMG = RecPreparerPOM.Click_ManualGrids();
                            browser.sleep(1000);
                            browser.executeScript("arguments[0].click()", CMG);

                            var ARow = RecPreparerPOM.Click_AddRow();
                            browser.sleep(1000);
                            browser.executeScript("arguments[0].click()", ARow);

                            var Code = RecPreparerPOM.Click_Ccode();
                            browser.sleep(1000);
                            browser.executeScript("arguments[0].click()", Code);

                            var CompanyCode = RecPreparerPOM.Click_Companycode();
                            browser.sleep(1000);
                            browser.executeScript("arguments[0].click()", CompanyCode);
                            var GlAcc = RecPreparerPOM.Click_GLAcc();
                            browser.sleep(3000);
                            browser.executeScript("arguments[0].click()", GlAcc);
                            browser.sleep(3000);
                            var GLAcco = RecPreparerPOM.Click_GLAccount();
                            browser.sleep(1000);
                            browser.executeScript("arguments[0].click()", GLAcco);

                            var TransactDa = RecPreparerPOM.Transaction_Date();
                            browser.sleep(1000);
                            browser.executeScript("arguments[0].click()", TransactDa);
                            browser.sleep(2000);
                            RecPreparerPOM.TransationDate_Input('07042021');
                            browser.sleep(2000);
                            var Cur = RecPreparerPOM.click_currency();
                            browser.sleep(1000);
                            browser.executeScript("arguments[0].click()", Cur);

                            RecPreparerPOM.Currency_Input('GBP');
                            browser.sleep(1000);

                            var NetacntAmnt = RecPreparerPOM.Clik_NetAcntedAmnt();
                            browser.sleep(1000);
                            browser.executeScript("arguments[0].click()", NetacntAmnt);
                            browser.sleep(2000);
                            RecPreparerPOM.Net_Input(fvist);
                            //RecPreparerPOM.Net_Input(0.01);
                            browser.sleep(2000);
                            var ExplanaCate = RecPreparerPOM.click_ExplanationCategory();
                            browser.sleep(1000);
                            browser.executeScript("arguments[0].click()", ExplanaCate);
                            browser.sleep(2000);
                            RecPreparerPOM.Explanation_Input('Testing');
                            browser.sleep(2000);

                            var ExplaDesc = RecPreparerPOM.click_ExplanationDescription();
                            browser.sleep(1000);
                            browser.executeScript("arguments[0].click()", ExplaDesc);
                            browser.sleep(2000);
                            RecPreparerPOM.ExplanationDesc_Input('Automation Testing');
                            browser.sleep(2000);
                            var LineDesc = RecPreparerPOM.click_LineDescription();
                            browser.sleep(1000);
                            browser.executeScript("arguments[0].click()", LineDesc);
                            browser.sleep(2000);
                            RecPreparerPOM.LineDesc_Input('Automation lineDesc Testing');
                            browser.sleep(2000);
                            var period = RecPreparerPOM.click_Period();
                            browser.sleep(1000);
                            browser.executeScript("arguments[0].click()", period);

                            var periodDropdown = RecPreparerPOM.Click_PeriodDrop();
                            browser.sleep(1000);
                            browser.executeScript("arguments[0].click()", periodDropdown);
                            browser.sleep(3000);

                            var Save = RecPreparerPOM.Click_Saving();
                            browser.sleep(1000);
                            browser.executeScript("arguments[0].click()", Save);
                            browser.sleep(7000);


                        }

                    });
                }
            });
        });

        it('TS06_Manual Fully match & Manual Match with Variance: ', function () {
            browser.manage().timeouts().implicitlyWait(60000);
            RecPreparerPOM.ClickOn_ReconTab();
            // browser.sleep(6000);
            browser.manage().timeouts().implicitlyWait(60000);
            browser.sleep(2000);
            var PresenceOfUnmatched = RecPreparerPOM.Go_To_Unmatched();//element(by.xpath("//span[contains(text(),'Unmatched')]"));
            PresenceOfUnmatched.isPresent().then(() => {
                browser.executeScript('arguments[0].click()', PresenceOfUnmatched);
                browser.sleep(20000);
                var CMO2 = RecPreparerPOM.Click_Left_MoreOptions();
                browser.executeScript("arguments[0].click()", CMO2);
                browser.sleep(1000);
                var AUMR = RecPreparerPOM.AvailbilityUnMatchedRows();
                AUMR.getText().then((aumr) => {
                    if (aumr != 'SHOW ALL (0)') {
                        var CMO23 = RecPreparerPOM.Select_More_Options_DropDown();
                        browser.executeScript("arguments[0].click()", CMO23);
                        browser.sleep(1000);
                        var CMO22 = RecPreparerPOM.Click_Right_MoreOptions();
                        browser.executeScript("arguments[0].click()", CMO22);
                        browser.sleep(1000);
                        var AUMR1 = RecPreparerPOM.AvailbilityUnMatchedRows();
                        AUMR1.getText().then((aumr1) => {
                            if (aumr1 != 'SHOW ALL (0)') {
                                var CMO222= RecPreparerPOM.Select_More_Options_DropDown();
                                 browser.executeScript("arguments[0].click()", CMO222);
                                //RecPreparerPOM.AvailablityOf_Row_Unmatched();
                                /*var CLHSCB = RecPreparerPOM.Click_LHS_CheckBox();
                                browser.executeScript("arguments[0].click()", CLHSCB);
                                browser.sleep(10000);
                                var CRHSCB = RecPreparerPOM.Click_RHS_CheckBox();
                                browser.executeScript("arguments[0].click()", CRHSCB);*/
                                browser.sleep(40000);
                                var RSRHS = RecPreparerPOM.Row_Selection_RHS();
                                //RSRHS.click();
                                browser.executeScript("arguments[0].scrollIntoView()", RSRHS);
                                browser.executeScript("arguments[0].click();", RSRHS);
                                browser.sleep(1000);
                                var RSLHS = RecPreparerPOM.Row_Selection_LHS();
                                //RSLHS.click();
                                browser.executeScript("arguments[0].click();", RSLHS);

                                var WFVT = RecPreparerPOM.Wait_For_Variance_Tab();
                                browser.driver.wait(function () {
                                    browser.wait(EC.visibilityOf(WFVT), 20000);
                                    return WFVT;
                                });
                                browser.sleep(10000);
                                var VA = RecPreparerPOM.Variance_Amount();
                                VA.getText().then((va) => {
                                    if (va == '0.00' || va == '0.000') {
                                        var CFM = RecPreparerPOM.Click_Fully_Match();
                                        browser.executeScript("arguments[0].scrollIntoView()", CFM);
                                        browser.executeScript("arguments[0].click()", CFM);
                                        var CYWV = RecPreparerPOM.Click_YESWith_Variance();
                                        browser.executeScript("arguments[0].click()", CYWV);

                                    }
                                    else {
                                        var CMWV = RecPreparerPOM.Click_Match_With_Variance();
                                        browser.executeScript("arguments[0].scrollIntoView()", CMWV);
                                        browser.executeScript("arguments[0].click()", CMWV);
                                        var CYWV = RecPreparerPOM.Click_YESWith_Variance();
                                        browser.executeScript("arguments[0].click()", CYWV);


                                    }

                                });
                            }
                            //browser.executeScript("arguments[0].click()",WFVT);
                        });
                    }
                });
            });

            browser.sleep(3000);
           var CSV2= RecPreparerPOM.ClickOn_Summary_Validation();
            browser.executeScript("arguments[0].click()", CSV2);
            browser.sleep(1000);


        });

        it('TS07_Preparer_Validating Preparer is able to Explain ,unexplained line(Preparer Amend (Explain or Match)): ', function () {
            browser.manage().timeouts().implicitlyWait(60000);
            RecPreparerPOM.ClickOn_ReconTab();
            // browser.sleep(6000);
            browser.manage().timeouts().implicitlyWait(60000);
            browser.sleep(2000);
            var PS = RecPreparerPOM.Preparer_Status();
            browser.executeScript("arguments[0].scrollIntoView()", PS);
            browser.manage().timeouts().implicitlyWait(6000);
            var Acquire = RecPreparerPOM.AutoCertify_Status();
            Acquire.getText().then((sys) => {
                if (sys != 'SYSTEM_CLOSED') {
                    F3StepsOfGlobalFilter();
                    var DropDownFilter = RecPreparerPOM.DropDown_Column_In_GlobalFilter();
                    DropDownFilter.getText().then((dpv) => {
                        var ClickGlobalFilter = RecPreparerPOM.ClickOn_Global_Filter();
                        browser.executeScript("arguments[0].scrollIntoView()", ClickGlobalFilter);
                        browser.executeScript("arguments[0].click()", ClickGlobalFilter);
                        browser.sleep(1000);
                        var clickdiscard = RecPreparerPOM.ClickOn_Discard();
                        browser.executeScript("arguments[0].scrollIntoView()", clickdiscard);
                        browser.executeScript("arguments[0].click()", clickdiscard);
                        browser.sleep(2000);
                        for (let y = 0; y < 21; y++) {
                            //'- Commentary' 
                            var CheckCommentry = element(by.xpath("//span[contains(text(),'Commentary')]"));
                            CheckCommentry.isPresent().then((CC) => {
                                if (CC == true) {
                                    browser.executeScript("arguments[0].scrollIntoView()", CheckCommentry);

                                }
                                else {
                                    var scrollToPoint = element(by.xpath("//span[contains(text(),'" + dpv[y] + "')]"));
                                    browser.executeScript("arguments[0].scrollIntoView()", scrollToPoint);
                                }

                            });
                        }
                    });
                    browser.sleep(2000);
                    browser.manage().timeouts().implicitlyWait(100000);


                    F3StepsOfGlobalFilter();
                    //RecPreparerFun.Find_ColumnSettingsFrom_Filter();
                    var SCCF = RecPreparerFun.Select_CategoryColumn_FromFilter();
                    browser.executeScript("arguments[0].click()", SCCF);
                    browser.sleep(2000);
                    var COIF = RecPreparerPOM.Click_Operator_InsideFilter();
                    browser.executeScript("arguments[0].click()", COIF);
                    browser.sleep(2000);
                    var SOIF = RecPreparerPOM.Select_Operators_InsideFilter();
                    browser.executeScript("arguments[0].click()", SOIF);
                    var COAF = RecPreparerPOM.ClickOn_Apply_Filter();
                    browser.executeScript("arguments[0].click()", COAF);
                    var WIOC1 = RecPreparerPOM.Wait_Till_InvisibleOf_Cirle();
                    browser.driver.wait(function () {
                        browser.wait(EC.invisibilityOf(WIOC1), 20000)
                        return WIOC1;
                    }).then(() => {
                        var CURA = RecPreparerPOM.Check_Unexplained_Row_Availability();
                        // browser.executeScript("arguments[0].click()", CURA);
                        //browser.sleep(2000);
                        //var ShowingAllRow = RecPreparerPOM.Showing_All_Rows();
                       CURA.getText().then((cura) => {
                            if (cura != '0 of 0') {

                                RecPreparerFun.Column_ForEdit();
                            }
                            
                        });

                    });
                    var PSW = RecPreparerPOM.PresentOf_SmallWindow();
                    PSW.isPresent().then((psw) => {
                        if (psw === true) {
                            browser.sleep(1000);
                            RecPreparerPOM.input_Search(WorksheetPrepareReviewApprove['N' + i].v);
                            browser.sleep(1000);
                            RecPreparerPOM.Apply_To_All_Item();
                            browser.sleep(1000);
                            RecPreparerPOM.Click_Submit();
                            browser.sleep(10000);
                        }
                    });

                }
            });

        });

        it('#TS08_Preparer_Validating preparer is able to Re-Run the rule after explaing unexplained line: ', function () {
            browser.sleep(2000);
            var PS = RecPreparerPOM.Preparer_Status();
            browser.executeScript("arguments[0].scrollIntoView()", PS);
            browser.manage().timeouts().implicitlyWait(6000);
            var Acquire = RecPreparerPOM.AutoCertify_Status();
            Acquire.getText().then((sys) => {
                if (sys != 'SYSTEM_CLOSED') {
                    var CMO3 = RecPreparerPOM.Click_MoreOptions();
                    browser.executeScript("arguments[0].click()", CMO3);
                    browser.manage().timeouts().implicitlyWait(60000);
                    var CURA = RecPreparerPOM.Check_Unexplained_Row_Availability1();
                    browser.executeScript("arguments[0].scrollIntoView()", CURA);
                    //browser.executeScript("arguments[0].click()", CURA);
                    //browser.sleep(2000);
                    //var ShowingAllRow = RecPreparerPOM.Showing_All_Rows();
                    CURA.getText().then((cura) => {
                        console.log('2225 cura:-'+cura);
                        if (cura != 'SHOW ALL (0)') {
                            var ClickBA=RecPreparerPOM.Click_Bussiness_Account();
                            browser.executeScript("arguments[0].click()", ClickBA);
                            browser.sleep(2000);
                            var RRR = RecPreparerPOM.Re_Run_Rules();
                            browser.executeScript("arguments[0].click()", RRR);
                            var RRN = RecPreparerPOM.Re_Run_Now();
                            browser.executeScript("arguments[0].click()", RRN);
                            browser.manage().timeouts().implicitlyWait(60000);
                            //span/i[contains(text(),'In Progress')]
                            //var RN = RecPreparerPOM.Rerun_Notification();
                            //var RRCN = RecPreparerPOM.ReRun_Completion_Notification();
                            //var RN1 = EC.invisibilityOf(RN);
                            //var RRCN1 = EC.visibilityOf(RRCN);
                            //browser.wait(EC.or(RN1, RRCN1), 300000).then(()=>{
                            browser.sleep(300000).then(()=>{
                            browser.manage().timeouts().implicitlyWait(6000);
                            //browser.sleep(2000);
                            var clickRecGroup = RecPreparerPOM.ClickOn_PopUpRecGroups();
                            clickRecGroup.isPresent().then((q) => {
                                console.log('After Rerun q value:-' + q);
                                if (q == true) {
                                    browser.sleep(2000);
                                    var CBA=RecPreparerPOM.Click_Bussiness_Account();
                                    CBA.click();
                                    browser.sleep(2000);
                                    browser.executeScript("arguments[0].scrollIntoView()", clickRecGroup);
                                    browser.sleep(2000);
                                    clickRecGroup.click();
                                    //var clickRecGroup1 = RecPreparerPOM.ClickOn_PopUpRecGroups();
                                    //browser.sleep(1000);
                                    //browser.executeScript("arguments[0].click()", clickRecGroup1);
                                    browser.sleep(1000);
                                    //var validation3 = element(by.css("notifier-container div[type='notificationData.type']")).getText();
                                    //expect(validation3).toBe('Task Acquired Successfully\nclose');
                                    browser.sleep(2000);
                                    var checkforDataShowing = RecPreparerPOM.DataLoading_InProgess();
                                    checkforDataShowing.isPresent().then((cds) => {
                                        if (cds == true) {
                                            var checkforDataShowing1 = RecPreparerPOM.WaitFor_InvisibilityOf_DataLoading();
                                            browser.wait(EC.invisibilityOf(checkforDataShowing1), 200000);
                                        }
                                    });
                                }
                            });
                        });

                        }
                        else{
                            var ClickBA=RecPreparerPOM.Click_Bussiness_Account();
                            browser.executeScript("arguments[0].click()", ClickBA);
                            browser.sleep(2000);
                        }
                    });
                }
            });

        });

        it('#TS09_Comment / Atatchement(Summary level) & Download Excel in Summary tab: ', function () {
            //Comment / Atatchement(Summary level)
            browser.sleep(1000);
            var CSV3=RecPreparerPOM.ClickOn_Summary_Validation();
            browser.executeScript("arguments[0].click()", CSV3);
            browser.sleep(5000);
            var PS = RecPreparerPOM.Preparer_Status();
            browser.executeScript("arguments[0].scrollIntoView()", PS);
            browser.manage().timeouts().implicitlyWait(6000);
            var Acquire = RecPreparerPOM.AutoCertify_Status();
            Acquire.getText().then((sys) => {
                if (sys != 'SYSTEM_CLOSED') {
                    var CMO4 = RecPreparerPOM.Click_MoreOptions();
                    browser.executeScript("arguments[0].click()", CMO4);
                    browser.sleep(1000);
                    var AvailabilityOfSummaryCommentsAttachment = RecPreparerPOM.Availability_Of_SummaryComments_Attachment();
                    browser.executeScript("arguments[0].click()", AvailabilityOfSummaryCommentsAttachment);
                    browser.sleep(2000);
                    var ShowingAllRow = RecPreparerPOM.Showing_All_Rows();
                    ShowingAllRow.getText().then((ASCA) => {
                        if (ASCA != 'Showing All Rows (0)') {
                            var SSCA = RecPreparerPOM.SelectSummary_Buttonfor_CommentsAttachement();
                            browser.executeScript("arguments[0].click()", SSCA);
                            browser.sleep(3000);
                            var CACISL = RecPreparerPOM.Click_AddComments_InSummeryLevel();
                            browser.executeScript("arguments[0].click()", CACISL);
                            browser.sleep(1000);
                            RecPreparerPOM.click_Attention_CommentsAttachments_InSummaryLevel();
                            browser.sleep(1000);
                            CommentsAndAttachmentsP('Want some details for Summary Level In Preparer.');
                            browser.sleep(1000);
                            RecPreparerPOM.ClickOnClear_For_CommentsAttachement();
                            browser.sleep(2000);
                            var DEST = RecPreparerPOM.Download_Excel_SummaryTab();
                            browser.sleep(2000);
                            browser.executeScript("arguments[0].click()", DEST);
                            browser.sleep(2000);
                            browser.manage().timeouts().implicitlyWait(7000);
                            var EDV = RecPreparerPOM.Excel_DownLoad_Validation();
                            browser.manage().timeouts().implicitlyWait(7000);
                            expect(EDV.isPresent()).toEqual(true);
                        }
                    });

                }
            });
        });

        it('#TS10_Add comments and Attachments in MRI Level: ', function () {
            var PS = RecPreparerPOM.Preparer_Status();
            browser.executeScript("arguments[0].scrollIntoView()", PS);
            browser.manage().timeouts().implicitlyWait(6000);
            var Acquire = RecPreparerPOM.AutoCertify_Status();
            Acquire.getText().then((sys) => {
                if (sys != 'SYSTEM_CLOSED') {
                    var CMG = RecPreparerPOM.Click_ManualGrids();
                    browser.sleep(1000);
                    browser.executeScript("arguments[0].click()", CMG);
                    browser.sleep(2000);
                    var CMO5 = RecPreparerPOM.Click_MoreOptions();
                    browser.executeScript("arguments[0].click()", CMO5);
                    browser.sleep(1000);
                    var AMRICA = RecPreparerPOM.AvailablityOf_MRI_For_CommentAttachment();
                    browser.executeScript("arguments[0].click()", AMRICA);
                    browser.sleep(2000);
                    var ShowingAllRow = RecPreparerPOM.Showing_All_Rows();
                    ShowingAllRow.getText().then((amrica) => {
                        if (amrica != 'Showing All Rows (0)') {
                            var ACMRI = RecPreparerPOM.Click_Comments_MRI();
                            browser.sleep(2000);
                            browser.executeScript("arguments[0].click()", ACMRI);
                            browser.sleep(5000);
                            CommentsAndAttachmentsP('Want some details for MRI Level ');
                            browser.sleep(2000);
                        }
                    });
                }
            });
        });

        it('#TS11_Download Excel in MRI GRids: ', function () {
            var PS = RecPreparerPOM.Preparer_Status();
            browser.executeScript("arguments[0].scrollIntoView()", PS);
            browser.manage().timeouts().implicitlyWait(6000);
            var Acquire = RecPreparerPOM.AutoCertify_Status();
            Acquire.getText().then((sys) => {
                if (sys != 'SYSTEM_CLOSED') {
                    var DEMG = RecPreparerPOM.Download_Excel_MRIGrids();
                    browser.sleep(2000);
                    browser.executeScript("arguments[0].click()", DEMG);
                    browser.sleep(2000);
                    browser.manage().timeouts().implicitlyWait(7000);
                    var EDV = RecPreparerPOM.Excel_DownLoad_Validation();
                    browser.manage().timeouts().implicitlyWait(7000);
                    expect(EDV.isPresent()).toEqual(true);
                }
            });
        });

        it('#TS12_Preparer_Recon Line Level Comments&Attachemnets/ Download Excel Sheet: ', function () {
            //'' + 1 + '.Click on recon tab' 
            var PS = RecPreparerPOM.Preparer_Status();
            browser.executeScript("arguments[0].scrollIntoView()", PS);
            browser.manage().timeouts().implicitlyWait(6000);
            var Acquire = RecPreparerPOM.AutoCertify_Status();
            Acquire.getText().then((sys) => {
                if (sys != 'SYSTEM_CLOSED') {
                    console.log("Recon line level download and attachment");
                    browser.sleep(3000);
                    RecPreparerPOM.ClickOn_ReconTab();
                    // browser.sleep(6000);
                    browser.manage().timeouts().implicitlyWait(60000);
                    browser.sleep(2000);
                    var CMO6 = RecPreparerPOM.Click_MoreOptions();
                    browser.executeScript("arguments[0].click()", CMO6);
                    browser.sleep(6000);
                    var CURA = RecPreparerPOM.Check_Unexplained_Row_Availability1();
                    browser.executeScript("arguments[0].click()", CURA);
                    browser.sleep(2000);
                    browser.manage().timeouts().implicitlyWait(60000);
                    var ShowingAllRow = RecPreparerPOM.Showing_All_Rows();
                    ShowingAllRow.getText().then((cura) => {
                        if (cura != 'Showing All Rows (0)') {
                            //Comment / Atatchement(line level)
                            browser.sleep(2000);
                            var ClickAll = RecPreparerPOM.Select_AllRow_InRecon();
                            browser.executeScript("arguments[0].click();", ClickAll);
                            browser.manage().timeouts().implicitlyWait(7000);
                            var addCommentsLineLevel = RecPreparerPOM.Add_CommentsLine_Level();
                            browser.executeScript("arguments[0].scrollIntoView()", addCommentsLineLevel);
                            browser.executeScript("arguments[0].click()", addCommentsLineLevel);
                            browser.manage().timeouts().implicitlyWait(6000);
                            CommentsAndAttachmentsP('Want some details for Line Level In Preparer.');
                            browser.sleep(8000);
                            RecPreparerPOM.ClickOnClear_For_CommentsAttachement();
                            browser.sleep(2000);
                            //Download of excel(Recon Tab)
                            var DERT = RecPreparerPOM.Download_Excel();
                            browser.executeScript("arguments[0].click()", DERT);
                            browser.manage().timeouts().implicitlyWait(7000);
                            var EDV = RecPreparerPOM.Excel_DownLoad_Validation();
                            browser.manage().timeouts().implicitlyWait(7000);
                            expect(EDV.isPresent()).toEqual(true);
                        }
                    });
                }
            });

        });

        it('TS13_Preparer_Risk&Oppurtunities tab: ', function () {
            // ' + 1 + '.Clik on Risk & oppurtunities tab.'
            var PS = RecPreparerPOM.Preparer_Status();
            browser.executeScript("arguments[0].scrollIntoView()", PS);
            browser.manage().timeouts().implicitlyWait(6000);
            var Acquire = RecPreparerPOM.AutoCertify_Status();
            Acquire.getText().then((sys) => {
                if (sys != 'SYSTEM_CLOSED') {
                    RecPreparerPOM.ClickOn_Risk_Opportunity();
                    browser.sleep(6000);
                }
            });
        });

        it('TS14_Preparer_Submission Button:', function () {
            var PS = RecPreparerPOM.Preparer_Status();
            browser.executeScript("arguments[0].scrollIntoView()", PS);
            browser.manage().timeouts().implicitlyWait(6000);
            var Acquire = RecPreparerPOM.AutoCertify_Status();
            Acquire.getText().then((sys) => {
                if (sys != 'SYSTEM_CLOSED') {
                    //Verify all the rules has been passed and submission button is enabled,Click on Submit button.
                    var scrollToActionReasonCode = RecPreparerPOM.ClickOn_Action_ReasonCode();
                    browser.executeScript("arguments[0].scrollIntoView();", scrollToActionReasonCode);
                    var CheckAutoCertify = RecPreparerPOM.System_Certified();
                    CheckAutoCertify.isPresent().then((ww) => {
                        console.log(ww);
                        if (ww == true) {

                            var AB = RecPreparerPOM.Arrow_Back();
                            browser.executeScript("arguments[0].click()", AB);
                            browser.sleep(1000);
                            var Pending = RecPreparerPOM.Click_Pending();
                            browser.executeScript("arguments[0].click()", Pending);
                            browser.sleep(2000);
                            var mousemove2 = RecPreparerPOM.MouseMove_RecGroupName();
                            mousemove2.isPresent().then((val1) => {
                                if (val1 != false) {
                                    browser.refresh();
                                    browser.sleep(10000);
                                }
                            });

                        }
                        else {
                            var SubmitButton = RecPreparerPOM.Click_SaveSubmit();
                            SubmitButton.isEnabled().then((text) => {
                                console.log(text);
                                if (text == true) {
                                    var R = RecPreparerPOM.Click_SaveSubmit();
                                    browser.executeScript("arguments[0].click()", R);
                                    browser.sleep(1000);
                                    var ReasonName = RecPreparerPOM.click_ReasonName();
                                    browser.executeScript("arguments[0].click()", ReasonName);
                                    browser.sleep(1000);
                                    var SelectReason = RecPreparerPOM.Select_Reason();
                                    browser.sleep(1000);
                                    browser.executeScript("arguments[0].scrollIntoView();", SelectReason).then(() => {
                                        browser.sleep(1000);
                                        browser.executeScript("arguments[0].click();", SelectReason);
                                    });
                                    browser.sleep(1000);
                                    RecPreparerPOM.Submit_Notes('Automation Testing');
                                    browser.sleep(1000);
                                    var CS = RecPreparerPOM.click_Submit();
                                    browser.executeScript("arguments[0].click()", CS);
                                    browser.sleep(3000);
                                    var validation3 = RecPreparerPOM.Get_Notification();
                                    browser.wait(EC.presenceOf(validation3), 30000);
                                    browser.refresh();
                                    browser.sleep(3000);

                                }
                            });
                        }
                    });
                }
            });
        });

    }
    it('Preparer LogOut:-', function () {
        //Preparer Log Out
        browser.sleep(8000);
        var avtar = RecPreparerPOM.Click_Avatar();
        browser.executeScript("arguments[0].scrollIntoView()", avtar).then(() => {
            avtar.click();
        });

        var SO = RecPreparerPOM.Sign_Out();
        browser.executeScript("arguments[0].click()", SO);
        console.log('**************************** RECON PREPARER FINISHED ************************************');
        browser.sleep(8000);
    });
    //------------------------------------------Preparer Screen------------------------------------------------
    //------------------------------------------Reviewer Screen------------------------------------------------
    xit('TS01_Reviewer Screen Login :-', function () {

        //'1. Open the Browser,enter QA URL and Hit enter key.'
        browser.waitForAngularEnabled(false);
        browser.ignoreSynchronization = true;
        //Entering the URL
        recrevsanitypomR.Get(WorksheetControlSTR['A2'].v);
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(8000);

        //'2. Enter Valid Username or email.'
        //Entering the username
        recrevsanitypomR.enterUserName(WorksheetControlSTR['B3'].v);


        //'3. Enter Valid Password.'
        //Entering the password
        //element(by.id('password')).sendKeys('' + WorksheetLogin['C2'].v + '');
        recrevsanitypomR.enterPassword(WorksheetControlSTR['C3'].v);


        //4. Click on Login Button Or Hit Enter Key.'
        //Clicking on Login button
        recrevsanitypomR.enterLogin();
        browser.sleep(15000);
    });

    xit('TC02_Reviewer_Validate Reviewerr Screen:-', function () {
        //'1. Click on Assigned  Programs.'
        click_SignIn();
        //Selecting The Reviewer
        //element(by.xpath("//div[contains(@class,'mat-select-panel mat-primary')]")).element(by.xpath("//mat-option/span[contains(text(),' Reviewer ']')]")).click();
        reviewerFun.ChangeInto_ReviewerRole(WorksheetControlSTR['E3'].v);
        browser.sleep(14000);

        //Selecting the assigned program
        //element(by.xpath("//div[contains(text(),'" + WorksheetControlSTR['B10'].v + "')]")).click();
        reviewerFun.Click_OnProgramReviewerScreen(WorksheetControlSTR['B10'].v);
        //recrevsanitypomR.select_assignprog();
        browser.sleep(5000);

    });
    for (let i = FrowReconReviewer; i <= LrowReconReviewer; i++) {

        xit('TS03_Reviewer_Selecting recon:- ', function () {
            // 1. Click on the Workunitname which needs to be validated.
            browser.sleep(8000);
            changing10To200();
            browser.sleep(8000);
            //selecting rec group name field
            var mousemove1 = recrevsanitypomR.Click_RecGroupName();
            mousemove1.isPresent().then((val) => {
                if (val != false) {
                    browser.executeScript("arguments[0].scrollIntoView()", mousemove1).then(() => {
                        //clicking on  hidden filter  on recon group name.
                        recrevsanitypomR.Click_HiddenFilter_ForRecGroupName();

                    });

                    //click filter under hidden filter.
                    recrevsanitypomR.select_hiddenfil();

                    //Unselect all the before search
                    recrevsanitypomR.unselect_search();
                    browser.sleep(3000);

                    //Searching for the particular rec group name
                    recrevsanitypomR.search_recgrp(WorksheetPrepareReviewApprove['A' + i].v);
                    var searchrecGroups = recrevsanitypomR.Search_RecGroups();
                    searchrecGroups.isPresent().then((p) => {
                        if (p == true) {
                            browser.sleep(3000);
                            //Select all after search
                            recrevsanitypomR.select_all();
                            browser.sleep(1000);

                            //Applying filter
                            recrevsanitypomR.apply_filter();
                            recrevsanitypomR.Click_CommonProgram();
                            browser.sleep(1000);
                            //Comment / Atatchement(Recon level)
                            var addCommentsReconLevel = recrevsanitypomR.Add_Comments();
                            browser.executeScript("arguments[0].scrollIntoView()", addCommentsReconLevel);
                            browser.executeScript("arguments[0].click()", addCommentsReconLevel);
                            browser.sleep(1000);
                            CommentsAndAttachmentsR('Want some details for Recon Level In Reviewer.');
                            browser.sleep(2000);

                            //Selecting the recon
                            var presenceofRecGroupReviewer = recrevsanitypomR.Presence_ofRecGroup_Reviewer();//element(by.css("[ref='eCenterContainer'] div[row-index='0']"));
                            presenceofRecGroupReviewer.isPresent().then((pp) => {
                                if (pp == true) {
                                    browser.sleep(2000);
                                    presenceofRecGroupReviewer.click();
                                    browser.sleep(8000);
                                    var CMO7 = recrevsanitypomR.Click_MoreOptions();
                                    browser.executeScript("arguments[0].click()", CMO7);
                                    browser.sleep(1000);
                                    var AvailabilityOfSummaryCommentsAttachment = recrevsanitypomR.Availability_Of_SummaryComments_Attachment();
                                    browser.executeScript("arguments[0].click()", AvailabilityOfSummaryCommentsAttachment);
                                    browser.sleep(2000);
                                    var ShowingAllRow = RecPreparerPOM.Showing_All_Rows();
                                    ShowingAllRow.getText().then((ASCA) => {
                                        if (ASCA != 'Showing All Rows (0)') {
                                            var SSCA = recrevsanitypomR.SelectSummary_Buttonfor_CommentsAttachement();
                                            browser.executeScript("arguments[0].click()", SSCA);
                                            browser.sleep(3000);
                                            //Comment / Atatchement(Summary level)
                                            browser.sleep(5000);
                                            var CACISL = recrevsanitypomR.Click_AddComments_InSummeryLevel();
                                            browser.executeScript("arguments[0].click()", CACISL);
                                            browser.sleep(1000);
                                            CommentsAndAttachmentsR('Want some details for Summary Level In Reviewer.');

                                        }
                                    });
                                    //Validation
                                    //var validation2 = element(by.css("notifier-container div[type='notificationData.type']")).getText();
                                    //browser.wait(EC.visibilityOf(validation2), 5000).then(()=>{
                                    //expect(validation2).toBe('Task Acquired Successfully\nclose');
                                    //browser.sleep(3000);
                                    //});
                                }
                                else {
                                    browser.refresh();
                                    browser.sleep(5000);
                                }

                            });

                        }
                        else {
                            browser.refresh();
                            browser.sleep(5000);
                            var mousemove2 = recrevsanitypomR.Click_RecGroupName();
                            mousemove2.isPresent().then((val1) => {
                                if (val1 != false) {
                                    browser.executeScript("arguments[0].click()", mousemove2);

                                    StepsDuringRecGroupSelection();


                                    var presenceofRecGroupReviewer = recrevsanitypomR.Presence_ofRecGroup_Reviewer();//element(by.css("[ref='eCenterContainer'] div[row-index='0']"));
                                    presenceofRecGroupReviewer.isPresent().then((pp) => {
                                        if (pp == true) {
                                            presenceofRecGroupReviewer.click();
                                            browser.sleep(8000);
                                            var CMO8 = recrevsanitypomR.Click_MoreOptions();
                                            browser.executeScript("arguments[0].click()", CMO8);
                                            browser.sleep(1000);
                                            var AvailabilityOfSummaryCommentsAttachment = recrevsanitypomR.Availability_Of_SummaryComments_Attachment();
                                            browser.executeScript("arguments[0].click()", AvailabilityOfSummaryCommentsAttachment);
                                            browser.sleep(2000);
                                            var ShowingAllRow = RecPreparerPOM.Showing_All_Rows();
                                            ShowingAllRow.getText().then((ASCA) => {
                                                if (ASCA != 'Showing All Rows (0)') {
                                                    var SSCA = recrevsanitypomR.SelectSummary_Buttonfor_CommentsAttachement();
                                                    browser.executeScript("arguments[0].click()", SSCA);
                                                    browser.sleep(3000);
                                                    //Comment / Atatchement(Summary level)
                                                    browser.sleep(5000);
                                                    var CACISL = recrevsanitypomR.Click_AddComments_InSummeryLevel();
                                                    browser.executeScript("arguments[0].click()", CACISL);
                                                    browser.sleep(1000);
                                                    CommentsAndAttachmentsR('Want some details for Summary Level In Reviewer.');
                                                }
                                            });
                                            //Validation
                                            //var validation2 = element(by.css("notifier-container div[type='notificationData.type']")).getText();

                                            //expect(validation2).toBe('Task Acquired Successfully\nclose');
                                            //browser.sleep(3000);
                                        }
                                        else {
                                            browser.refresh();
                                            browser.sleep(5000);
                                        }

                                    });
                                }
                                else {
                                    browser.refresh();
                                    browser.sleep(5000);
                                    var mousemove3 = recrevsanitypomR.Click_RecGroupName();
                                    mousemove3.isPresent().then((val2) => {
                                        if (val2 != false) {
                                            browser.executeScript("arguments[0].click()", mousemove3);
                                            //clicking on  hidden filter  on recon group name.
                                            StepsDuringRecGroupSelection();
                                            //Selecting the recon
                                            var presenceofRecGroupReviewer = recrevsanitypomR.Presence_ofRecGroup_Reviewer();//element(by.css("[ref='eCenterContainer'] div[row-index='0']"));
                                            presenceofRecGroupReviewer.isPresent().then((pp) => {
                                                if (pp == true) {
                                                    presenceofRecGroupReviewer.click();
                                                    browser.sleep(8000);
                                                    var CMO9 = recrevsanitypomR.Click_MoreOptions();
                                                    browser.executeScript("arguments[0].click()", CMO9);
                                                    browser.sleep(1000);
                                                    var AvailabilityOfSummaryCommentsAttachment = recrevsanitypomR.Availability_Of_SummaryComments_Attachment();
                                                    browser.executeScript("arguments[0].click()", AvailabilityOfSummaryCommentsAttachment);
                                                    browser.sleep(2000);
                                                    var ShowingAllRow = RecPreparerPOM.Showing_All_Rows();
                                                    ShowingAllRow.getText().then((ASCA) => {
                                                        if (ASCA != 'Showing All Rows (0)') {
                                                            var SSCA = recrevsanitypomR.SelectSummary_Buttonfor_CommentsAttachement();
                                                            browser.executeScript("arguments[0].click()", SSCA);
                                                            browser.sleep(3000);
                                                            //Comment / Atatchement(Summary level)
                                                            browser.sleep(5000);
                                                            var CACISL = recrevsanitypomR.Click_AddComments_InSummeryLevel();
                                                            browser.executeScript("arguments[0].click()", CACISL);
                                                            browser.sleep(1000);
                                                            CommentsAndAttachmentsR('Want some details for Summary Level In Reviewer.');
                                                        }
                                                    });
                                                    //Validation
                                                    //var validation2 = element(by.css("notifier-container div[type='notificationData.type']")).getText();
                                                    //expect(validation2).toBe('Task Acquired Successfully\nclose');
                                                    //browser.sleep(3000);
                                                }
                                                else {
                                                    browser.refresh();
                                                    browser.sleep(5000);
                                                }

                                            });
                                        }
                                    });

                                }
                            });
                        }
                    });
                }
            });
            browser.sleep(2000);
            //Download of excel(Rec Grids)
            var CRG = recrevsanitypomR.Click_RecGrids();
            browser.executeScript("arguments[0].click()", CRG);
            browser.sleep(5000);
            var DERG = recrevsanitypomR.Download_Excel();
            browser.executeScript("arguments[0].click()", DERG);
            browser.manage().timeouts().implicitlyWait(7000);

        });

        xit('TS04_Reviewer_Validating recon tab:-  ', function () {
            //'Clicking on Recon tab',
            var preseceofReconTab = recrevsanitypomR.select_rectab();
            preseceofReconTab.isPresent().then((oo) => {
                if (oo == true) {
                    preseceofReconTab.click();
                    browser.sleep(6000);
                }
            });
            //Comment / Atatchement(line level)
            var addCommentsLineLevel = recrevsanitypomR.Add_Comments();
            browser.executeScript("arguments[0].scrollIntoView()", addCommentsLineLevel);
            browser.executeScript("arguments[0].click()", addCommentsLineLevel);
            browser.manage().timeouts().implicitlyWait(6000);
            CommentsAndAttachmentsR('Want some details for Line Level In Reviewer.');
            browser.manage().timeouts().implicitlyWait(6000);
            //Download of excel(Recon Tab)
            var DERT = recrevsanitypomR.Download_Excel();
            browser.executeScript("arguments[0].click()", DERT);
            browser.sleep(2000);


        });

        xit('TS05_Reviewer_Risk&Oppurtunities tab:-', function () {
            //Clicking on Risk&Oppurtunities tab
            var presenceOfRiskOpportunity = recrevsanitypomR.select_riskopptab();
            presenceOfRiskOpportunity.isPresent().then((oo1) => {
                if (oo1 == true) {
                    presenceOfRiskOpportunity.click();
                    browser.sleep(6000);
                }
            });



        });

        xit('TS06_Reviewer_Submission Button:-', function () {
            if (WorksheetPrepareReviewApprove['D' + i].v == 'Approve') {
                //'1. Verify all the rules has been passed and submission button is enabled,Click on Submit button.', function () {
                var x = recrevsanitypomR.Click_Approve();
                x.isEnabled().then((text) => {
                    if (text == true) {
                        var R = recrevsanitypomR.Click_Approve();//element(by.xpath("//span[contains(text(),'Approve')]"));
                        browser.executeScript("arguments[0].click()", R);
                        browser.sleep(2000);
                        //element(by.css("mat-select[name='reasonName']")).click();
                        recrevsanitypomR.Click_ReasonName();
                        browser.sleep(1000);
                        // let abc= WorksheetPrepareReviewApprove['C'+i].v
                        //contains(text(),'"+WorksheetPrepareReviewApprove['C'+i].v+"')
                        var SelectReason = recrevsanitypomR.Select_ReasonName();//element(by.xpath("//html[1]/body[1]/div[1]/div[4]/div[1]/div[1]/div[1]/mat-option[1]/span[1]"));
                        browser.sleep(1000);
                        browser.executeScript("arguments[0].scrollIntoView();", SelectReason).then(() => {
                            browser.sleep(1000);
                            browser.executeScript("arguments[0].click();", SelectReason);
                        });
                        //element(by.xpath("//div[@class='cdk-overlay-pane']//mat-option/span[contains(text(),'  Ready For Next Level  ')]")).click();
                        browser.sleep(1000);
                        //element(by.css("textarea[aria-label='submitNotes']")).sendKeys('Automation Testing');
                        recrevsanitypomR.Submit_Notes(WorksheetPrepareReviewApprove['G' + i].v);
                        browser.sleep(1000);
                        //element(by.css("button[aria-label='APPROVE']")).click();
                        recrevsanitypomR.Click_Approve_Button();
                        browser.sleep(6000);
                        //var validation2 = element(by.css("notifier-container div[type='notificationData.type']")).isPresent();
                        //expect(validation2).toBe(true);
                        // browser.sleep(3000);


                    }
                });
            }
            else {
                var r = recrevsanitypomR.Click_Reject();
                browser.executeScript("arguments[0].click()", r);
                recrevsanitypomR.Click_ReasonName();
                browser.sleep(1000);
                var SelectReason = recrevsanitypomR.Select_ReasonName();
                browser.sleep(1000);
                browser.executeScript("arguments[0].scrollIntoView();", SelectReason).then(() => {
                    browser.sleep(1000);
                    browser.executeScript("arguments[0].click();", SelectReason);
                });
                browser.sleep(1000);
                recrevsanitypomR.Submit_Notes(WorksheetPrepareReviewApprove['H' + i].v);
                browser.sleep(1000);
                recrevsanitypomR.Click_RejectButton();
                browser.sleep(6000);

            }
            browser.refresh();
            browser.sleep(10000);
        });

    }
    xit('Reviewer Logout:-', function () {

        //'Reviewer logout '
        browser.sleep(5000);
        var ClickCre = recrevsanitypomR.click_credential();
        browser.executeScript("arguments[0].scrollIntoView();", ClickCre);
        browser.executeScript("arguments[0].click();", ClickCre);
        var SO = recrevsanitypomR.Sign_Out();
        browser.executeScript("arguments[0].click()", SO);
        console.log('********************************* RECON REVIEWER FINISHED ************************************');
        browser.sleep(3000);
    });
    //------------------------------------------Reviewer Screen------------------------------------------------
    //------------------------------------------Approver Screen------------------------------------------------

    xit('TS01_Approver  Screen Login :-', function () {
        //'1. Open the Browser,enter QA URL and Hit enter key.'
        browser.waitForAngularEnabled(false);
        browser.ignoreSynchronization = true;
        //Entering the URL
        //browser.get(''+WorksheetLogin['A2'].v+''); 
        recappsanitypomA.Get(WorksheetControlSTA['A2'].v);

        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(8000);
        //'2. Enter Valid Username or email.', function () {
        //Entering the username
        recappsanitypomA.enterUserName(WorksheetControlSTA['B4'].v);

        //'3. Enter Valid Password.', function () {
        //Entering the password
        recappsanitypomA.enterPassword(WorksheetControlSTA['C4'].v);

        //'4. Click on Login Button Or Hit Enter Key.', function () {
        //Clicking on Login button
        recappsanitypomA.enterLogin();
        browser.sleep(14000);

    });

    xit('TS02_Approver_Validate Approver Screen:-', function () {
        //'1. Click on Assigned  Programs.
        click_SignIn();
        browser.sleep(3000);
        //Selecting The Approver
        recappsanityFun.ChangeInto_ApproverRole(WorksheetControlSTA['F4'].v);
        browser.sleep(14000);

        //Selecting the assigned program
        recappsanityFun.Click_OnProgramApproverScreen(WorksheetControlSTA['B10'].v);
        //recrevsanitypom.select_assignprog();
        browser.sleep(5000);
    });

    for (let i = FrowReconApprover; i <= LrowReconApprover; i++) {
        if (WorksheetPrepareReviewApprove['D' + i].v == 'Approve') {
            xit('TS03_Approver_Selecting recon:- ', function () {
                //1. Click on the Workunitname which needs to be validated.',

                browser.sleep(8000);
                changing10To200();
                browser.sleep(8000);
                //selecting rec group name field
                var mousemove1 = recappsanitypomA.Click_RecGroupName();
                mousemove1.isPresent().then((val) => {
                    if (val != false) {
                        browser.executeScript("arguments[0].scrollIntoView()", mousemove1).then(() => {
                            //clicking on  hidden filter  on recon group name.
                            recappsanitypomA.Click_HiddenFilter_ForRecGroupName();
                        });

                        //click filter under hidden filter.
                        recappsanitypomA.select_hiddenfil();

                        //Unselect all the before search
                        recappsanitypomA.unselect_search();
                        browser.sleep(3000);

                        //Searching for the particular rec group name
                        recappsanitypomA.search_recgrp(WorksheetPrepareReviewApprove['A' + i].v);
                        var searchrecGroups = recappsanitypomA.Search_RecGroups();
                        searchrecGroups.isPresent().then((p) => {
                            if (p == true) {
                                browser.sleep(3000);
                                //Select all after search
                                recappsanitypomA.select_all();
                                browser.sleep(1000);

                                //Applying filter
                                recappsanitypomA.apply_filter();
                                recappsanitypomA.Click_CommonProgram();
                                browser.sleep(1000);


                                //Comment / Atatchement(Recon level)
                                var addCommentsReconLevel = recappsanitypomA.Add_Comments();
                                browser.executeScript("arguments[0].scrollIntoView()", addCommentsReconLevel);
                                browser.executeScript("arguments[0].click()", addCommentsReconLevel);
                                browser.sleep(1000);
                                CommentsAndAttachmentsA('Want some details for Recon Level In Approver.');
                                browser.sleep(2000);


                                //Selecting the recon
                                var presenceofRecGroupApprover = recappsanitypomA.Presence_ofRecGroup_Approver();//element(by.css("[ref='eCenterContainer'] div[row-index='0']"));
                                presenceofRecGroupApprover.isPresent().then((pp) => {
                                    if (pp == true) {
                                        browser.sleep(2000);
                                        presenceofRecGroupApprover.click();
                                        browser.sleep(8000);
                                        var CMO10 = recappsanitypomA.Click_MoreOptions();
                                        browser.executeScript("arguments[0].click()", CMO10);
                                        browser.sleep(1000);
                                        var AvailabilityOfSummaryCommentsAttachment = recappsanitypomA.Availability_Of_SummaryComments_Attachment();
                                        browser.executeScript("arguments[0].click()", AvailabilityOfSummaryCommentsAttachment);
                                        browser.sleep(2000);
                                        var ShowingAllRow = RecPreparerPOM.Showing_All_Rows();
                                        ShowingAllRow.getText().then((ASCA) => {
                                            if (ASCA != 'Showing All Rows (0)') {
                                                var SSCA = recappsanitypomA.SelectSummary_Buttonfor_CommentsAttachement();
                                                browser.executeScript("arguments[0].click()", SSCA);
                                                browser.sleep(3000);
                                                //Comment / Atatchement(Summary level)
                                                browser.sleep(5000);
                                                var CACISL = recappsanitypomA.Click_AddComments_InSummeryLevel();
                                                browser.executeScript("arguments[0].click()", CACISL);
                                                browser.sleep(1000);
                                                CommentsAndAttachmentsA('Want some details for Summary Level In Approver.');

                                            }
                                        });//Validation
                                        //var validation3 = element(by.css("notifier-container div[type='notificationData.type']")).getText();
                                        //expect(validation3).toBe('Task Acquired Successfully\nclose');
                                        //browser.sleep(3000);
                                    }
                                    else {
                                        browser.refresh();
                                        browser.sleep(5000);
                                    }
                                });
                            }
                            else {
                                browser.refresh();
                                browser.sleep(5000);
                                var mousemove2 = recappsanitypomA.Click_RecGroupName();
                                mousemove2.isPresent().then((val2) => {
                                    if (val2 != false) {
                                        browser.executeScript("arguments[0].click()", mousemove2);
                                        //clicking on  hidden filter  on recon group name.
                                        recappsanitypomA.Click_HiddenFilter_ForRecGroupName();
                                        //click filter under hidden filter.
                                        recappsanitypomA.select_hiddenfil();

                                        //Unselect all the before search
                                        recappsanitypomA.unselect_search();

                                        //Searching for the particular rec group name
                                        recappsanitypomA.search_recgrp(WorksheetPrepareReviewApprove['A' + i].v);


                                        //Select all after search
                                        recappsanitypomA.select_all();
                                        browser.sleep(1000);

                                        //Applying filter
                                        recappsanitypomA.apply_filter();
                                        recappsanitypomA.Click_CommonProgram();
                                        browser.sleep(1000);

                                        //Comment / Atatchement(Recon level)
                                        var addCommentsReconLevel = recappsanitypomA.Add_Comments();
                                        browser.executeScript("arguments[0].scrollIntoView()", addCommentsReconLevel);
                                        browser.executeScript("arguments[0].click()", addCommentsReconLevel);
                                        browser.sleep(1000);
                                        CommentsAndAttachmentsA('Want some details for Recon Level In Approver.');
                                        browser.sleep(2000);

                                        //Selecting the recon
                                        var presenceofRecGroupApprover = recappsanitypomA.Presence_ofRecGroup_Approver(); //element(by.css("[ref='eCenterContainer'] div[row-index='0']"));
                                        presenceofRecGroupApprover.isPresent().then((pp) => {
                                            if (pp == true) {
                                                presenceofRecGroupApprover.click();
                                                browser.sleep(8000);
                                                var CMO11 = recappsanitypomA.Click_MoreOptions();
                                                browser.executeScript("arguments[0].click()", CMO11);
                                                browser.sleep(1000);
                                                var AvailabilityOfSummaryCommentsAttachment = recappsanitypomA.Availability_Of_SummaryComments_Attachment();
                                                browser.executeScript("arguments[0].click()", AvailabilityOfSummaryCommentsAttachment);
                                                browser.sleep(2000);
                                                var ShowingAllRow = RecPreparerPOM.Showing_All_Rows();
                                                ShowingAllRow.getText().then((ASCA) => {
                                                    if (ASCA != 'Showing All Rows (0)') {
                                                        var SSCA = recappsanitypomA.SelectSummary_Buttonfor_CommentsAttachement();
                                                        browser.executeScript("arguments[0].click()", SSCA);
                                                        browser.sleep(3000);
                                                        //Comment / Atatchement(Summary level)
                                                        browser.sleep(5000);
                                                        var CACISL = recappsanitypomA.Click_AddComments_InSummeryLevel();
                                                        browser.executeScript("arguments[0].click()", CACISL);
                                                        browser.sleep(1000);
                                                        CommentsAndAttachmentsA('Want some details for Summary Level In Approver.');
                                                    }
                                                });
                                                //Validation
                                                // var validation2 = element(by.css("notifier-container div[type='notificationData.type']")).getText();
                                                // expect(validation2).toBe('Task Acquired Successfully\nclose');
                                                // browser.sleep(3000);
                                            }
                                            else {
                                                browser.refresh();
                                                browser.sleep(5000);
                                            }

                                        });
                                    }
                                    else {
                                        browser.refresh();
                                        browser.sleep(5000);
                                        var mousemove3 = recappsanitypomA.Click_RecGroupName();
                                        mousemove3.isPresent().then((val3) => {
                                            if (val3 != false) {
                                                browser.executeScript("arguments[0].click()", mousemove3);
                                                //clicking on  hidden filter  on recon group name.
                                                recappsanitypomA.Click_HiddenFilter_ForRecGroupName();
                                                //click filter under hidden filter.
                                                recappsanitypomA.select_hiddenfil();

                                                //Unselect all the before search
                                                recappsanitypomA.unselect_search();

                                                //Searching for the particular rec group name
                                                recappsanitypomA.search_recgrp(WorksheetPrepareReviewApprove['A' + i].v);

                                                //Select all after search
                                                recappsanitypomA.select_all();
                                                browser.sleep(1000);

                                                //Applying filter
                                                recappsanitypomA.apply_filter();
                                                recappsanitypomA.Click_CommonProgram();
                                                browser.sleep(1000);


                                                //Comment / Atatchement(Recon level)
                                                var addCommentsReconLevel = recappsanitypomA.Add_Comments();
                                                browser.executeScript("arguments[0].scrollIntoView()", addCommentsReconLevel);
                                                browser.executeScript("arguments[0].click()", addCommentsReconLevel);
                                                browser.sleep(1000);
                                                CommentsAndAttachmentsA('Want some details for Recon Level In Approver.');
                                                browser.sleep(2000);

                                                //Selecting the recon

                                                var presenceofRecGroupApprover = recappsanitypomA.Presence_ofRecGroup_Approver();//element(by.css("[ref='eCenterContainer'] div[row-index='0']"));
                                                presenceofRecGroupApprover.isPresent().then((pp) => {
                                                    if (pp == true) {
                                                        presenceofRecGroupApprover.click();
                                                        browser.sleep(8000);
                                                        var CMO12 = recappsanitypomA.Click_MoreOptions();
                                                        browser.executeScript("arguments[0].click()", CMO12);
                                                        browser.sleep(1000);
                                                        var AvailabilityOfSummaryCommentsAttachment = recappsanitypomA.Availability_Of_SummaryComments_Attachment();
                                                        browser.executeScript("arguments[0].click()", AvailabilityOfSummaryCommentsAttachment);
                                                        browser.sleep(2000);
                                                        var ShowingAllRow = recappsanitypomA.Showing_All_Rows();
                                                        ShowingAllRow.getText().then((ASCA) => {
                                                            if (ASCA != 'Showing All Rows (0)') {
                                                                var SSCA = recappsanitypomA.SelectSummary_Buttonfor_CommentsAttachement();
                                                                browser.executeScript("arguments[0].click()", SSCA);
                                                                browser.sleep(3000);
                                                                //Comment / Atatchement(Summary level)
                                                                browser.sleep(5000);
                                                                var CACISL = RecPreparerPOM.Click_AddComments_InSummeryLevel();
                                                                browser.executeScript("arguments[0].click()", CACISL);
                                                                browser.sleep(1000);
                                                                CommentsAndAttachmentsA('Want some details for Summary Level In Approver.');
                                                            }
                                                        });
                                                        //Validation
                                                        //var validation4 = element(by.css("notifier-container div[type='notificationData.type']")).getText();
                                                        //expect(validation4).toBe('Task Acquired Successfully\nclose');
                                                        //browser.sleep(3000);
                                                    }
                                                    else {
                                                        browser.refresh();
                                                        browser.sleep(5000);
                                                    }

                                                });
                                            }
                                        });

                                    }

                                });
                            }
                        });
                    }
                });
                browser.sleep(2000);
                //Download of excel(Rec Grids)
                var CRG = recappsanitypomA.Click_RecGrids();
                browser.executeScript("arguments[0].click()", CRG);
                browser.sleep(5000);
                var DERG = recappsanitypomA.Download_Excel();
                browser.executeScript("arguments[0].click()", DERG);
                browser.manage().timeouts().implicitlyWait(7000);



            });

            xit('TS04_Approver_Validating recon tab:-', function () {
                //'Clicking on Recon tab.'
                var presenceofReconTab = recappsanitypomA.select_rectab();
                presenceofReconTab.isPresent().then((oo) => {
                    if (oo == true) {
                        presenceofReconTab.click();
                        browser.sleep(6000);
                    }
                    // browser.sleep(3000);
                });
                var addCommentsLineLevel = recappsanitypomA.Add_Comments();
                browser.executeScript("arguments[0].scrollIntoView()", addCommentsLineLevel);
                browser.executeScript("arguments[0].click()", addCommentsLineLevel);
                browser.manage().timeouts().implicitlyWait(6000);
                CommentsAndAttachmentsA('Want some details for Line Level In Approver.');
                browser.manage().timeouts().implicitlyWait(6000);
                //Download of excel(Recon Tab)
                var DERT = recappsanitypomA.Download_Excel();
                browser.executeScript("arguments[0].click()", DERT);
                browser.sleep(2000);

            });

            xit('TS05_Approver_Risk&Oppurtunities tab:-', function () {

                //'Clicking on Risk&Oppurtunities tab.'
                var presenceOfRiskOpportunity = recappsanitypomA.select_riskopptab();
                presenceOfRiskOpportunity.isPresent().then((oo1) => {
                    if (oo1 == true) {
                        presenceOfRiskOpportunity.click();
                        browser.sleep(6000);
                        //browser.sleep(2000);
                    }
                });
            });

            xit('TS06_Approver_Submission Button:-', function () {
                if (WorksheetPrepareReviewApprove['I' + i].v == 'Approve') {
                    //'1. Verify all the rules has been passed and submission button is enabled,Click on Submit button.'
                    var x = recappsanitypomA.Click_Approve();
                    x.isEnabled().then((text) => {
                        if (text == true) {
                            var R = recappsanitypomA.Click_Approve();
                            browser.executeScript("arguments[0].click()", R);
                            browser.sleep(2000);
                            recappsanitypomA.Click_ReasonName();
                            browser.sleep(1000);
                            var SelectReason = recappsanitypomA.Select_ReasonName();
                            browser.sleep(1000);
                            browser.executeScript("arguments[0].scrollIntoView();", SelectReason);
                            browser.executeScript("arguments[0].click();", SelectReason);
                            browser.sleep(3000);
                            recappsanitypomA.Submit_Notes(WorksheetPrepareReviewApprove['L' + i].v);
                            browser.sleep(1000);
                            recappsanitypomA.Click_Approve_Button();
                            browser.sleep(2000);
                            /* var validation2 = element(by.css("notifier-container div[type='notificationData.type']")).isPresent();
                             expect(validation2).toBe(true);
                             browser.sleep(3000);
                             */


                        }
                    });
                }
                else {
                    var r = recappsanitypomA.Click_Reject();
                    browser.executeScript("arguments[0].click()", r);
                    recappsanitypomA.Click_ReasonName();
                    browser.sleep(1000);
                    var SelectReason = recappsanitypomA.Select_ReasonName();
                    browser.sleep(1000);
                    browser.executeScript("arguments[0].scrollIntoView();", SelectReason).then(() => {
                        browser.sleep(1000);
                        browser.executeScript("arguments[0].click();", SelectReason);
                    });
                    browser.sleep(1000);
                    recappsanitypomA.Submit_Notes(WorksheetPrepareReviewApprove['M' + i].v);
                    browser.sleep(1000);
                    recappsanitypomA.Click_RejectButton();
                    browser.sleep(6000);
                }
                browser.refresh();
                browser.sleep(10000);
            });
        }
    }
    xit('Approver Logout:-', function () {
        //'Approver logout '
        var ClickCre = recappsanitypomA.click_credential();
        browser.executeScript("arguments[0].scrollIntoView();", ClickCre);
        browser.executeScript("arguments[0].click();", ClickCre);
        var SO = recappsanitypomA.Sign_Out();
        browser.executeScript("arguments[0].click()", SO);
        console.log('****************************RECON APPROVER FINISHED ************************************');
        browser.sleep(8000);


    });
    //------------------------------------------Approver Screen------------------------------------------------
});
