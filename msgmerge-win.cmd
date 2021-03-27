for /F "usebackq" %%F in (`where /r translations *.po`) do (
  msgmerge %%F translations/dictionary.pot > %%F.tmp
  move %%F.tmp %%F
)