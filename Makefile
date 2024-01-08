.PHONY: all npm-build serve format clean

all: npm-build public/ACKNOWLEDGMENTS.txt

npm-build:
	pnpm run build

serve:
	pnpm run serve

clean:
	rm -rf node_modules
	rm -rf dist
	# TODO Would be nice to delete build outputs in `public/` too.

dist: npm-build public/ACKNOWLEDGMENTS.txt
	# Allowlisted; don't copy e.g. .map files.
	mkdir -p dist
	cp public/ACKNOWLEDGMENTS.txt dist/
	#cp public/favicon.ico dist/
	cp public/index.html dist/
	cp public/index.js dist/
	cp public/index.css dist/

public/ACKNOWLEDGMENTS.txt: misc/ACKNOWLEDGMENTS.template.txt package.json
	cat misc/ACKNOWLEDGMENTS.template.txt > $@
	npx generate-license-file --input package.json --overwrite --output $@.tmp
	cat $@.tmp >> $@
	rm $@.tmp
