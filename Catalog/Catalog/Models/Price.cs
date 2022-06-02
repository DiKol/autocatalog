using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.Data.Models
{
    public class Price
    {
        [Key]
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public DateTime PriceDate { get; set; }

        [Column(TypeName = "decimal(18,4)")]
        public decimal PriceOnDate { get; set; }

    }
}
