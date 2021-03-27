if exist translations/%1.po (
  echo LANG %1 already exisit
) else (
  msginit --input=translations/dictionary.pot --locale=%1 --output=translations/%1.po
)