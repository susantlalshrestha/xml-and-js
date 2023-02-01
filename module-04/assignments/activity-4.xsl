<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <head>
                <title>Product List</title>
            </head>
            <body>
                <h1>Shippable Product List</h1>
                <table border="1">
                    <tr>
                        <th>SKU</th>
                        <th>Product Name</th>
                        <th>Manufacturer</th>
                        <th>Description</th>
                        <th>Price (US$)</th>
                        <th>Price (CAD$)</th>
                        <th>Price (EUR)</th>
                    </tr>
                    <xsl:for-each select="products/product[@shippable='true']">
                        <tr>
                            <td><xsl:value-of select="@sku" /></td>
                            <td><xsl:value-of select="productName" /></td>
                            <td><xsl:value-of select="manufacturer" /></td>
                            <td><xsl:value-of select="description" /></td>
                            <td><xsl:value-of select="prices/price[1]" /></td>
                            <td><xsl:value-of select="prices/price[2]" /></td>
                            <td><xsl:value-of select="prices/price[3]" /></td>
                        </tr>
                    </xsl:for-each>
                </table>
                <h1>Product List Manufactured By ACME</h1>
                <table border="1">
                    <tr>
                        <th>SKU</th>
                        <th>Product Name</th>
                        <th>Manufacturer</th>
                        <th>Description</th>
                        <th>Price (US$)</th>
                        <th>Price (CAD$)</th>
                        <th>Price (EUR)</th>
                    </tr>
                    <xsl:for-each select="products/product">
                        <xsl:if test="manufacturer[@id='acme']">
                            <tr>
                                <td><xsl:value-of select="@sku" /></td>
                                <td><xsl:value-of select="productName" /></td>
                                <td><xsl:value-of select="manufacturer" /></td>
                                <td><xsl:value-of select="description" /></td>
                                <td><xsl:value-of select="prices/price[1]" /></td>
                                <td><xsl:value-of select="prices/price[2]" /></td>
                                <td><xsl:value-of select="prices/price[3]" /></td>
                            </tr>
                        </xsl:if>
                    </xsl:for-each>
                </table>
            </body>   
        </html>
    </xsl:template>
</xsl:stylesheet>
