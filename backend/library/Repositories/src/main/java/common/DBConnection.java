package common;

import java.sql.*;

public final class DBConnection
{
    private static Connection connection = null;

    private static String url = "jdbc:mysql://";
    private static String serverName = "localhost";
    private static String portNumber = "3306";
    private static String databaseName = "stikkerDB";
    private static String userName = "root";
    private static String password = "";

    private static String getConnectionUrl()
    {
        return url + serverName + ":" + portNumber + "/" + databaseName;
    }

    public static Connection getConnection() throws Exception
    {
        try
        {
            Class.forName("com.mysql.jdbc.Driver");

            String getConnectionUrl = getConnectionUrl();
            connection = DriverManager.getConnection(getConnectionUrl, userName, password);

            if (connection != null)
            {
                System.out.println("Connection to the was DB successful!");
            }
        }
        catch (Exception ex)
        {
            System.out.println("Error Trace in getConnection() : " + ex.getMessage());
            throw new Exception(ex.getMessage());
        }

        return connection;
    }
}
