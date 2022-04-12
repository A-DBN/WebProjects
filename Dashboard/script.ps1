res=$(netstat -ano  | findstr :$1 | awk '{print $5}')
pid=$(echo $res | cut -d ' ' -f1)

taskkill /PID $pid /F