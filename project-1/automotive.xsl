<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <head>
                <title>Automotive Data</title>
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
                <h1>Automotive Data</h1>
                <table border="1">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Street</th>
                        <th>City</th>
                        <th>Region</th>
                        <th>Country</th>
                        <th>Car Models</th>
                        <th>Cars</th>
                    </tr>
                    <xsl:for-each select="automotive-data/manufacturers-data">
                        <tr>
                            <td><xsl:value-of select="id" /></td>
                            <td><xsl:value-of select="name" /></td>
                            <td><xsl:value-of select="street" /></td>
                            <td><xsl:value-of select="city" /></td>
                            <td><xsl:value-of select="region" /></td>
                            <td><xsl:value-of select="country" /></td>
                            <td><xsl:apply-templates select="carModels"/></td>
                            <td><xsl:apply-templates select="cars"/></td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>   
        </html>
    </xsl:template>

    <xsl:template match="carModels">
        <table>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Year</th>
                <th>USD Price</th>
                <th>CAD Price</th>
                <th>EURO Price</th>
                <th>POUND Price</th>
            </tr>
            <xsl:for-each select="carModel">
                <tr>
                    <td><xsl:value-of select="id" /></td>
                    <td><xsl:value-of select="name" /></td>
                    <td><xsl:value-of select="year" /></td>
                    <td><xsl:value-of select="usdPrice" /></td>
                    <td><xsl:value-of select="cadPrice" /></td>
                    <td><xsl:value-of select="euroPrice" /></td>
                    <td><xsl:value-of select="poundPrice" /></td>
                </tr>
            </xsl:for-each>
        </table>        
    </xsl:template>

    <xsl:template match="cars">
        <table>
            <tr>
                <th>Vin</th>
                <th>Color</th>
                <th>Buyer</th>
            </tr>
            <xsl:for-each select="car">
                <tr>
                    <td><xsl:value-of select="vin" /></td>
                    <td><xsl:value-of select="color" /></td>
                    <td><xsl:value-of select="buyer" /></td>
                </tr>
            </xsl:for-each>
        </table>        
    </xsl:template>
</xsl:stylesheet>
