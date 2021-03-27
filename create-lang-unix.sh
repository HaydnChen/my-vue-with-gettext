if [ -f "translations/$1.po" ]; then
  echo "LANG $1 already exisit"
  exit 1
fi
msginit --input=translations/dictionary.pot --locale=$1 --output=translations/$1.po
