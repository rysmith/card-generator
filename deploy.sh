#!/bin/bash

echo '🦆 Deploying to s3://r4an.com...'

aws s3 cp cards.html s3://r4an.com --acl public-read
aws s3 cp styles/card-style.css s3://r4an.com/styles/ --acl public-read
aws s3 cp styles/print.css s3://r4an.com/styles/ --acl public-read
aws s3 cp scripts/card-script.js s3://r4an.com/scripts/ --acl public-read
aws s3 cp scripts/card.js s3://r4an.com/scripts/ --acl public-read
aws s3 cp scripts/card-storage.js s3://r4an.com/scripts/ --acl public-read
aws s3 cp scripts/placeholder.js s3://r4an.com/scripts/ --acl public-read
aws s3 cp scripts/tag.js s3://r4an.com/scripts/ --acl public-read
aws s3 cp scripts/search.js s3://r4an.com/scripts/ --acl public-read
aws s3 cp scripts/card-message.js s3://r4an.com/scripts/ --acl public-read
aws s3 cp scripts/card-artwork.js s3://r4an.com/scripts/ --acl public-read

echo '✅ Deploy complete'
echo ''