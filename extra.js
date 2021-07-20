it('#TS03_Preparer_Selecting recon: ', function () {
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

            //Comment / Atatchement(Recon level)
            var addCommentsReconLevel = RecPreparerPOM.Add_Comments_ReconLevel();
            browser.executeScript("arguments[0].scrollIntoView()", addCommentsReconLevel);
            browser.executeScript("arguments[0].click()", addCommentsReconLevel);
            browser.sleep(1000);
            CommentsAndAttachmentsP('Want some details for Recon Level In Preparer.');
            browser.sleep(2000);

            var clickRecGroup = RecPreparerPOM.ClickOn_PopUpRecGroups();
            clickRecGroup.isPresent().then((q) => {
                if (q == true) {
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
                                    //Comment / Atatchement(Summary level)
                                    //browser.sleep(1000);
                                    //RecPreparerPOM.Click_AddComments_InSummeryLevel();
                                    //browser.sleep(1000);
                                    //CommentsAndAttachmentsP('Want some details for Summary Level In Preparer');




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
    var FVIST = RecPreparerPOM.Find_Variance_InSummaryTab();
    FVIST.getText().then((fvist) => {
        //MRI Line Addition in MRI GRids:
        if (fvist != 0.00 || fvist != 0.000 || fvist != 0.0000) {
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
    RecPreparerPOM.ClickOn_Summary_Validation();
    browser.sleep(1000);
    var CTBIS = RecPreparerPOM.Check_Trial_BalanceInSummary();
    CTBIS.getText().then((ctbis) => {
        //Match Trail Balance with Rec Grid closing balance
        var CRG = RecPreparerPOM.Click_RecGrids();
        browser.executeScript("arguments[0].click()", CRG);
        browser.manage().timeouts().implicitlyWait(6000);
        var ClickTrailBalanace = RecPreparerPOM.Click_TrailBalance_InRecGrids();
        browser.executeScript("arguments[0].click()", ClickTrailBalanace);
        browser.sleep(5000);
        var RowOfClosingBalance = RecPreparerPOM.check_RowIn_RecGrids();
        RowOfClosingBalance.getText().then((RCB) => {
            if (RCB != 'SHOW ALL (0)') {
                F3StepsOfGlobalFilter();
                var GADDVGFRG = RecPreparerPOM.GetAll_DropDown_ValueIn_GlobalFilter_RecGrids();
                GADDVGFRG.getText().then((gaddvgrg) => {
                    console.log('GADDVGRG: '+gaddvgrg)
                    var ClickGlobalFilter = RecPreparerPOM.ClickOn_Global_Filter();
                    browser.executeScript("arguments[0].scrollIntoView()", ClickGlobalFilter);
                    browser.executeScript("arguments[0].click()", ClickGlobalFilter);
                    browser.sleep(1000);
                    var clickdiscard = RecPreparerPOM.ClickOn_Discard();
                    browser.executeScript("arguments[0].scrollIntoView()", clickdiscard);
                    browser.executeScript("arguments[0].click()", clickdiscard);
                    browser.sleep(3000);
                    for (let o = 0; o <= 20; o++) {
                        var ClosingBalance = RecPreparerPOM.ScrollTo_ClosingBalance_InRecGrids();
                        ClosingBalance.isPresent().then((CC) => {
                           // console.log('CC :'+CC);
                            if (CC == true) {
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
                browser.manage().timeouts().implicitlyWait(7000);
                var EDV=RecPreparerPOM.Excel_DownLoad_Validation();
                browser.manage().timeouts().implicitlyWait(7000);
                expect(EDV.isPresent()).toEqual(true);
            }
        });


    });

});

it('TS04_Preparer Acquire and Summary: ', function () {
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
            console.log('Work Unit is NOT ACQUIRED by Preparer Screen.');
        }

    });
});
it('TS06_Preparer Amend (Explain or Match): ', function () {
    RecPreparerPOM.ClickOn_ReconTab();
    // browser.sleep(6000);
    browser.manage().timeouts().implicitlyWait(60000);
    browser.sleep(2000);
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
    browser.wait(EC.invisibilityOf(WIOC1), 10000).then(() => {
        var CURA = RecPreparerPOM.Check_Unexplained_Row_Availability();
        CURA.isPresent().then((cura) => {
            if (cura != true) {
                RecPreparerFun.Column_ForEdit();
            }
            //else {
            //browser.refresh();
            //browser.sleep(20000);
            // }
        });

    });
    browser.sleep(2000);
    var PSW = RecPreparerPOM.PresentOf_SmallWindow();
    PSW.isPresent().then((psw) => {
        if (psw == true) {
            browser.sleep(1000);
            RecPreparerPOM.input_Search(WorksheetPrepareReviewApprove['N' + i].v);
            browser.sleep(1000);
            RecPreparerPOM.Apply_To_All_Item();
            browser.sleep(1000);
            RecPreparerPOM.Click_Submit();
            browser.sleep(10000);
        }
    });



});

it('#TS06_Rerun: ', function () {
    browser.sleep(2000);
    var CURA = RecPreparerPOM.Check_Unexplained_Row_Availability1();
    CURA.getText().then((cura) => {
        if (cura != 'SHOW ALL (0)') {
            browser.sleep(1000);
            var RRR = RecPreparerPOM.Re_Run_Rules();
            browser.executeScript("arguments[0].click()", RRR);
            var RRN = RecPreparerPOM.Re_Run_Now();
            browser.executeScript("arguments[0].click()", RRN);
            browser.manage().timeouts().implicitlyWait(60000);
            //span/i[contains(text(),'In Progress')]
            var RN = RecPreparerPOM.Rerun_Notification();
            var RRCN = RecPreparerPOM.ReRun_Completion_Notification();
            var RN1 = EC.invisibilityOf(RN);
            var RRCN1 = EC.visibilityOf(RRCN);
            browser.wait(EC.or(RN1, RRCN1), 300000);
            browser.sleep(2000);
            var clickRecGroup = RecPreparerPOM.ClickOn_PopUpRecGroups();
            clickRecGroup.isPresent().then((q) => {
                if (q == true) {
                    browser.sleep(1000);
                    clickRecGroup.click();
                    //browser.sleep(1000);
                    //browser.executeScript("arguments[0].click();", clickRecGroup);
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

        }
    });

});

it('#TS07_Comment / Atatchement(Summary level) & Download Excel in Summary tab: ', function () {
    //Comment / Atatchement(Summary level)
    browser.sleep(1000);
    RecPreparerPOM.ClickOn_Summary_Validation();
    browser.sleep(5000);
    var AvailabilityOfSummaryCommentsAttachment = RecPreparerPOM.Availability_Of_SummaryComments_Attachment();
    AvailabilityOfSummaryCommentsAttachment.getText().then((ASCA) => {
        if (ASCA != 'SHOW ALL (0)') {
            var CACISL = RecPreparerPOM.Click_AddComments_InSummeryLevel();
            browser.executeScript("arguments[0].click()", CACISL);
            browser.sleep(1000);
            RecPreparerPOM.click_Attention_CommentsAttachments_InSummaryLevel();
            browser.sleep(1000);
            CommentsAndAttachmentsP('Want some details for Summary Level In Preparer.');
        }
    });
    var DEST = RecPreparerPOM.Download_Excel_SummaryTab();
    browser.sleep(2000);
    browser.executeScript("arguments[0].click()", DEST);
    //browser.sleep(5000);
    browser.manage().timeouts().implicitlyWait(7000);
    var EDV=RecPreparerPOM.Excel_DownLoad_Validation();
    browser.manage().timeouts().implicitlyWait(7000);
    expect(EDV.isPresent()).toEqual(true);

});

it('#TS08_Add comments and Attachments in MRI Level: ', function () {
          
    var CMG = RecPreparerPOM.Click_ManualGrids();
    browser.sleep(1000);
    browser.executeScript("arguments[0].click()", CMG);
    browser.sleep(2000);
    var AMRICA=  RecPreparerPOM.AvailablityOf_MRI_For_CommentAttachment();
  AMRICA.getText().then((amrica)=>{
      if(amrica!='SHOW ALL (0)'){
    var ACMRI = RecPreparerPOM.Click_Comments_MRI();
    browser.sleep(2000);
    browser.executeScript("arguments[0].click()", ACMRI);
    browser.sleep(5000);
    CommentsAndAttachmentsP('Want some details for MRI Level');
    browser.sleep(2000);
  }
});
});

it('#TS09_Download Excel in MRI GRids: ', function () {
    var DEMG = RecPreparerPOM.Download_Excel_MRIGrids();
    browser.sleep(2000);
    browser.executeScript("arguments[0].click()", DEMG);
    //browser.sleep(5000);
    browser.manage().timeouts().implicitlyWait(7000);
    var EDV=RecPreparerPOM.Excel_DownLoad_Validation();
    browser.manage().timeouts().implicitlyWait(7000);
    //expect(EDV.isPresent()).toEqual(true);
});

it('#TS10_Preparer_Recon Line Level Comments&Attachemnets/ Download Excel Sheet: ', function () {
    //'' + 1 + '.Click on recon tab' 

    RecPreparerPOM.ClickOn_ReconTab();
    // browser.sleep(6000);
    browser.manage().timeouts().implicitlyWait(60000);
    browser.sleep(2000);
    var CURA = RecPreparerPOM.Check_Unexplained_Row_Availability1();
    CURA.getText().then((cura) => {
        if (cura != 'SHOW ALL (0)') {
            //Comment / Atatchement(line level)
            var addCommentsLineLevel = RecPreparerPOM.Add_CommentsLine_Level();
            browser.executeScript("arguments[0].scrollIntoView()", addCommentsLineLevel);
            browser.executeScript("arguments[0].click()", addCommentsLineLevel);
            browser.manage().timeouts().implicitlyWait(6000);
            CommentsAndAttachmentsP('Want some details for Line Level In Preparer.');
            browser.manage().timeouts().implicitlyWait(6000);
            //Download of excel(Recon Tab)
            var DERT = RecPreparerPOM.Download_Excel();
            browser.executeScript("arguments[0].click()", DERT);
            browser.manage().timeouts().implicitlyWait(7000);
            var EDV=RecPreparerPOM.Excel_DownLoad_Validation();
            browser.manage().timeouts().implicitlyWait(7000);
            expect(EDV.isPresent()).toEqual(true);
        }
    });

});

it('TS11_Preparer_Risk&Oppurtunities tab: ', function () {
    // ' + 1 + '.Clik on Risk & oppurtunities tab.'

    RecPreparerPOM.ClickOn_Risk_Opportunity();
    browser.sleep(6000);
});
it('TS12_Preparer_Submission Button:', function () {
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
});





