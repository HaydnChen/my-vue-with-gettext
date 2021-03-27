for i in $(find translations -type f -name '*.po'); do # Not recommended, will break on whitespace
  echo "Merging translations/dictionary.pot to $i"
  msgmerge $i translations/dictionary.pot > $i.tmp
  mv $i.tmp $i
done
