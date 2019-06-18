using System.Collections.Generic;

namespace isracart__yishaiHarniv.Models
{
    public class GithubResponseModel
    {
        public int total_count { get; set; }
        public bool incomplete_results { get; set; }
        public List<GithubItemModel> items { get; set; }
    }
}