using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebLota.Models;

namespace WebLota.Data
{
        public class AppDbContext : IdentityDbContext<Usuario, Rol, string>
        {
            public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

            public DbSet<Producto> Productos { get; set; }
            public DbSet<Categoria> Categorias { get; set; }
            public DbSet<Pedido> Pedidos { get; set; }
            public DbSet<DetallePedido> DetallePedidos { get; set; }
            public DbSet<Cliente> Clientes { get; set; }
            public DbSet<Carrito> Carritos { get; set; }

        }
    }

