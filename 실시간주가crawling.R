if (!requireNamespace("remotes")) install.packages("remotes")
remotes::install_github("mrchypark/tqk")

library(tqk)
library(dplyr)

code <- code_get()
code


code_get() %>%  
  filter(grepl("박셀바이오", name)) %>% 
  select(code) %>% 
  tqk_get(from = "2021-01-01") -> ss
ss



