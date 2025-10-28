/**
 * API Route para obtener productos desde Shopify
 * Este endpoint se usará cuando se active USE_SHOPIFY_API = true
 */

import { authenticate } from "../shopify.server";

export async function loader({ request }) {
  const { admin } = await authenticate.admin(request);
  
  try {
    // Obtener todos los productos con sus variantes
    const response = await admin.rest.resources.Product.all({
      session: admin.session,
      limit: 250, // Máximo permitido por Shopify
      fields: [
        "id",
        "title",
        "product_type",
        "vendor",
        "tags",
        "variants",
        "images",
        "metafields"
      ].join(","),
    });
    
    // Formatear productos para incluir toda la información necesaria
    const products = response.data.map(product => ({
      id: product.id,
      title: product.title,
      product_type: product.product_type,
      vendor: product.vendor,
      tags: product.tags ? product.tags.split(", ") : [],
      images: product.images || [],
      variants: product.variants.map(variant => ({
        id: variant.id,
        title: variant.title,
        sku: variant.sku,
        barcode: variant.barcode,
        price: variant.price,
        weight: variant.weight,
        weight_unit: variant.weight_unit,
        inventory_quantity: variant.inventory_quantity,
        admin_graphql_api_id: variant.admin_graphql_api_id,
      })),
      metafields: product.metafields || [],
    }));
    
    return {
      success: true,
      products: products,
      count: products.length,
    };
    
  } catch (error) {
    console.error("Error fetching products from Shopify:", error);
    return {
      success: false,
      error: error.message,
      products: [],
    };
  }
}

/**
 * Endpoint POST para actualizar información de productos (opcional)
 * Útil para actualizar metafields como kcal_per_kg
 */
export async function action({ request }) {
  const { admin } = await authenticate.admin(request);
  
  try {
    const formData = await request.formData();
    const productId = formData.get("productId");
    const kcalPerKg = formData.get("kcalPerKg");
    
    if (!productId || !kcalPerKg) {
      return {
        success: false,
        error: "Missing productId or kcalPerKg",
      };
    }
    
    // Actualizar metafield del producto
    const metafield = new admin.rest.resources.Metafield({
      session: admin.session,
    });
    
    metafield.product_id = productId;
    metafield.namespace = "nutrition";
    metafield.key = "kcal_per_kg";
    metafield.value = kcalPerKg;
    metafield.type = "number_decimal";
    
    await metafield.save({
      update: true,
    });
    
    return {
      success: true,
      message: "Product metafield updated successfully",
    };
    
  } catch (error) {
    console.error("Error updating product:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}
