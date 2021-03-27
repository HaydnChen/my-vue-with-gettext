setlocal enabledelayedexpansion
echo|set /p="node_modules\.bin\gettext-extract --attribute v-translate --output translations/dictionary.pot " > gettext.cmd
for /F "usebackq delims= " %%F in (`where /r src *.vue *.js`) do (
  set B=%%F
  echo|set /p=!B:%CD%\=! >> gettext.cmd
)
call gettext.cmd
del gettext.cmd