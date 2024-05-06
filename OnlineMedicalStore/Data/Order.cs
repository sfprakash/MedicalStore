using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
 


namespace OnlineMedicalStore.Data
{
    [Table("order", Schema = "public")]
    public class Order
    {
        [Key]
        public int OrderID { get; set; }
        public int MedicineID { get; set; }
        public int UserID { get; set; }
        public string MedicineName { get; set; }
        public int MedicineCount { get; set; }
        public int TotalPrice { get; set; }
        public string OrderStatus { get; set; }
    }
}