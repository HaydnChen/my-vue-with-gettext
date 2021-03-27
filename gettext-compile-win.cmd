echo | set /p="node_modules\.bin\gettext-compile --output src/i18n/translations.json " > gettext-compile.cmd
for /F "usebackq delims= " %%F in (`where /r translations *.po`) do (echo| set /p=%%F >> gettext-compile.cmd)
call gettext-compile.cmd
del gettext-compile.cmd