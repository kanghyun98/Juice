library(devtools)
library(taskscheduleR)
library(KeyboardSimulator)
??taskscheduler
taskscheduler_runnow("news_auto")    #정상!

taskscheduler_create(taskname="Update_for_Stockprice_auto", rscript="C:/Stock_project/portfolio_auto.R" #16:30
                     ,days=c("MON", "TUE","WED", "THU", "FRI"), schedule="WEEKLY"
                     ,starttime="16:30",startdate=format(Sys.Date(),"%Y/%m/%d"))

taskscheduler_create(taskname="Update_for_News_auto", rscript="C:/Stock_project/portfolio_auto.R"  #23:00
                     ,days=c("MON", "TUE","WED", "THU", "FRI"), schedule="WEEKLY"
                     ,starttime="23:00",startdate=format(Sys.Date(),"%Y/%m/%d"))

taskscheduler_ls()              #예약확인!(global environment에 등장!)

taskscheduler_delete(taskname="?")  #예약취소!

#test
taskscheduler_create(taskname="test_auto", rscript="C:/Stock_project/portfolio_auto.R"  
                     ,days="*", schedule="DAILY"
                     ,starttime="23:54",startdate=format(Sys.Date(),"%Y/%m/%d"))
taskscheduler_delete(taskname="test_auto")  
