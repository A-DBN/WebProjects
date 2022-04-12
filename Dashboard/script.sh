res=$(netstat -ano | findstr :$1 | awk '{print $5}' | cut -d ' ' -f 1)
pid=$(echo $res | cut -d ' ' -f1)

res=$(netstat -ano | findstr :$1 | awk '{print $5}')
pid=$(echo $res | cut -d ' ' -f1)

taskkill /PID $pid /F