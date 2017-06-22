# Jet Category Data

The root source of data is an xlsx file located [here](https://www.dropbox.com/s/18wn56zutquey8m/Jet_Taxonomy.xlsx?dl=0).

## How to generate CSV

There are many ways to convert xlsx from CSV. I prefer [xlsx2csv](https://github.com/dilshod/xlsx2csv).

First install the python library.

```
pip install xlsx2csv
```

Download the xslx.

```
wget https://www.dropbox.com/s/18wn56zutquey8m/Jet_Taxonomy.xlsx -P /tmp
```

Run `xlsx2csv`

```
xlsx2csv -a /tmp/Jet_Taxonomy.xlsx /tmp/converted
```

This should output at least 4 important sheets:

- Attributes.csv
- AttributeValues.csv
- Categories.csv
- CategoryAttributes.csv

Note: some sheets were renamed.

```
mv /tmp/converted/Attribute\ Values.csv /tmp/converted/AttributeValues.csv
mv /tmp/converted/Category-Attribute\ Mapping.csv /tmp/converted/CategoryAttributes.csv
```

Copy these to this directory.

```
cp /tmp/converted/Attributes.csv /tmp/converted/AttributeValues.csv /tmp/converted/Categories.csv /tmp/converted/CategoryAttributes.csv .
```

Check git diff for new changes.

```
git diff --stat

 README.md                |     5 +
 data/AttributeValues.csv | 50442 +++++++++++++++-------------------------------------------------------------------------
 data/Attributes.csv      |  2591 +++--
 data/Categories.csv      | 16050 ++++++++++++++++++----------
 4 files changed, 20580 insertions(+), 48508 deletions(-)
 ````