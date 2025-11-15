#!/bin/bash

echo "============================================"
echo "  3D WEBSITE BUILDER"
echo "  Başlatılıyor..."
echo "============================================"
echo ""
echo "Tarayıcıda şu adresi aç: http://localhost:8080"
echo ""
echo "Kapatmak için Ctrl+C bas."
echo ""

cd dist
python3 -m http.server 8080
