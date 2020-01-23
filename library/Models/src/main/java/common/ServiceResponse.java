package common;

public class ServiceResponse
{
    private String Message;
    private boolean IsSuccess;

    public ServiceResponse()
    {}

    public ServiceResponse(String message, boolean isSuccess) {
        Message = message;
        IsSuccess = isSuccess;
    }

    public String getMessage()
    {
        return Message;
    }

    public void setMessage(String message)
    {
        Message = message;
    }

    public boolean getIsSuccess()
    {
        return IsSuccess;
    }

    public void setIsSuccess(boolean success)
    {
        IsSuccess = success;
    }
}
