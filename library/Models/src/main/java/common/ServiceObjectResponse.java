package common;

public class ServiceObjectResponse<T> extends ServiceResponse
{
    private T object;

    public T getObject()
    {
        return object;
    }

    public void setObject(T object)
    {
        this.object = object;
    }
}
