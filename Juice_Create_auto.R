library(devtools)
library(taskscheduleR)
library(KeyboardSimulator)


taskscheduler_create(taskname="Update_Stockprice_auto", rscript="C:/Juice_Stock_project/Juice_Update_auto.R" #16:30
                     ,days=c("MON", "TUE","WED", "THU", "FRI"), schedule="WEEKLY"
                     ,starttime="16:30",startdate=format(Sys.Date(),"%Y/%m/%d"))

taskscheduler_create(taskname="Update_News_auto", rscript="C:/Juice_Stock_project/Juice_Update_auto.R"  #23:00
                     ,days=c("MON", "TUE","WED", "THU", "FRI"), schedule="WEEKLY"
                     ,starttime="23:00",startdate=format(Sys.Date(),"%Y/%m/%d"))

taskscheduler_ls()              #예약확인

taskscheduler_delete(taskname="~")  #예약취소 
