library(httr)
library(rvest)
library(readr)
library(xml2)
library(stringr)
library(dplyr)
library(KoNLP)
library(tidytext)

# code : 종목코드(6자리 숫자), startDate,endDate(YYYYmmdd), name(종목명)
# startDate는 원하는 시작일자보다 하루 전 날을 입력하시오.



make_df_of_stock <- function(code, startDate, endDate, name) { 
  url <- "https://fchart.stock.naver.com/siseJson.nhn"

data <- POST(url, query =
               list(
                 symbol = code,
                 requestType = '1',
                 startTime =  startDate,
                 endTime =  endDate,
                 timeframe =  'day'
               ))

stock_info <- content(data, "text") 
stock_info <- suppressWarnings(read_csv(stock_info)) 
stock_info <- stock_info[,1:6] 
stock_info <- na.omit(stock_info) 
colnames(stock_info) <- gsub('[[:punct:]]','',colnames(stock_info))

for(i in 1:nrow(stock_info)) {
  stock_info[i,1] <- gsub('[[:punct:]]','',stock_info[i,1]) 
}

stock_name <- data.frame(종목명 = rep(name, nrow(stock_info)))
stock_info <- cbind(stock_name,stock_info) 

QUERY <- URLencode(name) 
QUERY <- str_replace(QUERY, "&","%26")
number_of_news <- matrix(ncol=1, nrow=nrow(stock_info)) %>% as.data.frame() 
finance_naver_url_1 <- "https://finance.naver.com/news/news_search.nhn?rcdate=&q=" 
finance_naver_url_2 <- "&x=0&y=0&sm=all.basic&pd=4&stDateStart="
finance_naver_url_3 <- "&stDateEnd="
for(i in 1:nrow(stock_info)) {
  finance_naver_url <- paste0(finance_naver_url_1,QUERY,finance_naver_url_2,as.Date(stock_info[i,2], tryFormats = "%Y%m%d"),finance_naver_url_3,as.Date(stock_info[i,2], tryFormats = "%Y%m%d"))
  the_number_of_news <- NULL
  html <- read_html(finance_naver_url, encoding = "CP949")
  the_number_of_news <- (html_nodes(html,'p strong') %>% html_text())[2] %>% str_remove(',') %>% as.numeric()
  number_of_news[i,1] <- the_number_of_news
} 
stock_info <- cbind(stock_info,number_of_news)
colnames(stock_info)[8] <- "기사량"



changepct <- matrix(ncol=1, nrow=nrow(stock_info)) %>% as.data.frame()
for (i in 2:nrow(stock_info)) {
  changepct[i,1] <- round((stock_info[i,6] - stock_info[i-1,6])/stock_info[i-1,6]*100,2)
}
stock_info <- cbind(stock_info, changepct)
colnames(stock_info)[9] <- "등락률"
stock_info <- na.omit(stock_info)


page <- as.data.frame(matrix(ncol=1, nrow=nrow(stock_info)))
keywords <- matrix(ncol=5, nrow=nrow(stock_info)) %>% as.data.frame()

for(i in 1:nrow(stock_info)) {
  page[i,1] <- ceiling(stock_info[i,8]/20)
}

for(i in 1:nrow(stock_info)) {
  
  
  if (page[i,1] ==0) next
  
  PAGE <- seq(from=1, to=page[i,1], by=1)
  news_titles <- NULL
  
  for(x in PAGE) {
    finance_naver_url <-  paste0(finance_naver_url_1,QUERY,finance_naver_url_2,as.Date(stock_info[i,2], tryFormats = "%Y%m%d"),finance_naver_url_3,as.Date(stock_info[i,2], tryFormats = "%Y%m%d"),finance_naver_url_4,x)
    
    
    
    
    for(url in finance_naver_url) {
      html <- read_html(url,encoding="CP949")
      news_titles <- c(news_titles,html %>% 
                         html_nodes(css='.articleSubject') %>%   
                         html_nodes('a') %>%
                         html_text()
      )
    }
  }
  news_titles_pre <- gsub("[\n]",'', news_titles)
  news_titles_pre <- gsub("[[:punct:]]",' ', news_titles_pre)
  news_titles_pre <- gsub("[[:cntrl:]]",' ',news_titles_pre)
  
  news_df <- news_titles_pre %>% as.data.frame()
  
  title <- 1:nrow(news_df)
  
  ntb<- cbind(title,news_titles_pre) %>% as_tibble(encoding="UTF-8")
  
  x<-c(NA,NA)
  
  if(nrow(ntb)==1) {
    ntb <- rbind(ntb,x)
  }
  
  ntb %>% unnest_tokens(pos, news_titles_pre, token=SimplePos09) %>%
    mutate(pos_order = 1:n()) %>%
    filter(str_detect(pos, "/n")) %>%
    mutate(pos_done = str_remove(pos, "/.*$")) %>%
    arrange(pos_order) %>%
    filter(nchar(pos_done) > 1) %>%
    select(pos_done) %>% count(pos_done, sort=T) -> wordfrequency
  
  
  keywords[i,1:5] <- wordfrequency$pos_done[1:5]
  
  
}
colnames(keywords)[1:5] <- c("키워드1", "키워드2", "키워드3", "키워드4", "키워드5")
stock_info <- cbind(stock_info, keywords)




return(stock_info)

}
#사용예시
d <- make_df_of_stock("033780","20210201","20210206","KT&G")
s <- make_df_of_stock("030200","20210101","20210201","KT")

#합치기
rbind(d,s)

#json으로 바꾸기
toJSON(s, pretty = T)

#저장하기 (Csv파일)
write.csv(s,"kt.csv")

#mariaDB 연동
library(DBI)
Sys.setenv(JAVA_HOME='C:/Program Files/Java/jre1.8.0_221')
drv <- JDBC(driverClass = 'com.mysql.cj.jdbc.Driver',
            classPath = 'C:/mysql-connector-java-8.0.18')
conn <- dbConnect(drv, 'jdbc:mysql://127.0.0.1:3306/test?serverTimezone=UTC',
                  'scott','tiger')
dbWriteTable(conn, "KT", s)
dbSendUpdate(conn, 'drop table KT')
