# HTML5 Catfish Rich Media

H5 Catfish makes Rich Media creatives to sit at the bottom of the page, filling 100% of the rowser's width with interactive content, providing constant access point for users to engage with brands.

On user interaction, the HTML5 Catfish can expand from a slim footer to a large canvas for brands to unveil a full rich media experience.

## How to use

#### HTML file
- Include the catfish in your markup and instantiate your catfish instance.
```html
<head>
    <!-- Include AdServer API -->
    ...
    <!-- Include Catfish -->
    <script type="text/javascript" src="catfish.js"></script>
    <script type="text/javascript">
        catfish.initialize(
            'CatFish',
            'content_dc',
            'expanded_content_dc',
            '66', // collapsed height
            '300', // expanded height
            '970', // minimum height
            {
                url: ‘https://goo.gl/Ybf1rm’,
                width : 32,
                height : 32,
                offsetX : 10,
                offsetY : 5
            }
        );
    </script>
</head>
```
- Setup the creative markup structure
```html
<body>
    <div id="catfish">
        <div id="collcontent">
            <div id="content_dc">
                <button id="expand_btn_dc">Expand</button>
            </div>
        </div>
        <div id="expanded_content_dc">
            <div id="small_expanded_content_dc">		
                <button id="collapse_btn_dc">Collapse</button>
                <div id="background_exit_dc"></div>
            </div>
        </div>
    </div>
</body>
```



### Version
1.0.0
