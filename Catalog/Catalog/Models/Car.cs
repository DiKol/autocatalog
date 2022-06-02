using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Catalog.Data.Models
{
    public class Car
    {
        [Key]
        public int Id { get; set; }
        public string Color { get; set; }
        
        [Column(TypeName = "decimal(18,4)")]
        public decimal Volume { get; set; }
        public string Description { get; set; }
        public int BrandId { get; set; }
        public virtual Brand Brand { get; set; }
        public int ModelId { get; set; }
        public virtual Model Model { get; set; }
        public virtual IEnumerable<Price> Prices { get; set; }

    }
}
