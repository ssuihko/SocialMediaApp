using BackEnd.Data;
using Microsoft.EntityFrameworkCore;

namespace BackEnd.Repository
{
    public class Repository:IRepository
    {
        private SoMeContext _databaseContext;
        public Repository(SoMeContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        
    }
}
