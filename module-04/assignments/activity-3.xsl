<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <head>
                <title>Product List</title>
                <style>
                    .product {
                        width: 500px;
                        border: solid black 1px;
                        border-radius: 10px;
                        padding: 10px;
                        margin: 10px;
                    }

                    .head-container {
                        display:flex;
                    }

                    .sku, .manufacturer {
                        flex:1;
                        font-size: 12px;
                    }

                    .product-name {
                        font-weight: bold;
                    }

                    .description, .currency {
                        font-size: 14px;
                    }

                    .currency {
                        display: inline-block;
                        margin: 0px 10px 0px 0px;
                    }
                </style>
            </head>
            <body>
                <h1>Product List</h1>
                <xsl:for-each select="products/product">
                    <div class="product">
                        <p class="head-container">
                            <span class="sku">SKU: <xsl:value-of select="@sku" /></span>
                            <span class="manufacturer">Manufactured By: <xsl:value-of select="manufacturer" /></span>
                        </p>
                        <p class="product-name"><xsl:value-of select="productName" /></p>
                        <p class="description"><xsl:value-of select="description" /></p>
                        <xsl:for-each select="prices/price">
                            <span class="currency"><xsl:value-of select="text()" /></span>
                        </xsl:for-each>
                    </div>
                </xsl:for-each>
            </body>   
        </html>
    </xsl:template>
</xsl:stylesheet>
