<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <head>
                <title>Catalog</title>
                <style>
                    table {
                        border-collapse: collapse;
                        border: solid 1px;
                    }

                    th, td {
                        padding: 10px;
                        border: solid 1px;
                    }

                    td {
                        vertical-align: top;
                    }
                </style>
            </head>
            <body>
                <h1>Catalog</h1>
                <ol>
                    <xsl:for-each select="catalog/product">
                        <li>
                            <article>
                                <h3><xsl:value-of select="@product_id" /></h3>
                                <p><xsl:value-of select="@description" /></p>
                                <table>
                                    <tr>
                                        <th>Item Number</th>
                                        <th>Price</th>
                                        <th>Gender</th>
                                        <th>Small</th>
                                        <th>Medium</th>
                                        <th>Large</th>
                                        <th>Extra Large</th>
                                    </tr>
                                    <xsl:for-each select="catalog_item">
                                        <tr>
                                            <td><xsl:value-of select="item_number" /></td>
                                            <td><xsl:value-of select="price" /></td>
                                            <td>
                                                <xsl:choose>
                                                    <xsl:when test="@gender='Men'">M</xsl:when>
                                                    <xsl:when test="@gender='Women'">W</xsl:when>
                                                    <xsl:otherwise>NA</xsl:otherwise>
                                                </xsl:choose>
                                            </td>
                                            <td>
                                                <xsl:apply-templates select="size[@description='Small']"/>
                                            </td>
                                            <td>
                                                <xsl:apply-templates select="size[@description='Medium']"/>
                                            </td>
                                            <td>
                                                <xsl:apply-templates select="size[@description='Large']"/>
                                            </td>
                                            <td>
                                                <xsl:apply-templates select="size[@description='Extra Large']"/>
                                            </td>
                                        </tr>
                                    </xsl:for-each>
                                </table>
                            </article>
                        </li>
                    </xsl:for-each>
                </ol>
            </body>   
        </html>
    </xsl:template>

    <xsl:template match="size">
        <table>
            <tr>
                <th>color</th>
                <th>image</th>
            </tr>
            <xsl:for-each select="color_swatch">
                <tr>
                    <td><xsl:value-of select="text()" /></td>
                    <td><xsl:value-of select="@image" /></td>
                </tr>
            </xsl:for-each>
        </table>        
    </xsl:template>
</xsl:stylesheet>
