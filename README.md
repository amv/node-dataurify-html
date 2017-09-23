# node-dataurify-html
Simple cli utility to convert single HTML files to data URIs

# Simple example
To get a data URI version of the original data URL specification:

    npm install -g dataurify-html
    curl -s 'https://tools.ietf.org/html/rfc2397' | dataurify-html

# Example with inlined assets
[Remy Sharp](https://github.com/remy) has made a wonderful tool called [inliner](https://github.com/remy/inliner) which can be very helpful when bundling your application as a data URI:

    npm install -g dataurify-html inliner
    inliner 'https://remysharp.com' | dataurify-html

# How to test long data urls
It is really difficult (and sometimes impossible) to copy & paste long data URIs to the address bar. It is also impossible to pass arguments larger than `getconf ARG_MAX` to a console command, which on OSX means no arguments larger than `262144` characters.

On OSX, if your data URI is shorted than about `255 kB`, you can get past the `open` command not detecting data URIs as URLs by passing the URI through `osascript`:

    osascript -e 'tell application "Google Chrome" to open location "'`curl -s 'https://github.com' | dataurify-html`'"'

If you have a longer data URI, I believe your best option is to create a web page which contains the data URI, and open that. At the time of writing both Chrome and Edge have disabled top level navigation to data URIs due to phishing security concerns, and other browsers might follow later, so that means `location.href = dataURI` and `<a href="dataURI">` might not work for you.

Iframes with a data URI source still work in all browsers, and are expected to stay like that for a while, so that is one good option:

    export FSTART='<iframe style="width:100%;height:90%" src="'
    export FEND='" />'
    inliner 'https://remysharp.com' | dataurify-html | perl -pe 'chomp; $_ = $ENV{FSTART}. $_ .$ENV{FEND}' > framed.html; open framed.html
